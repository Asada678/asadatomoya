"use client";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  AmbientLight,
  BoxGeometry,
  Clock,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { isDebug, isTouchDevices } from "@utils";

import { useViewport } from "./ViewportContext";

const initialWorld: World = {
  // os: [] as Ob[],
  // raycaster: new Raycaster(),

  tick: 0,
  renderer: null,
  scene: null,
  composer: null,
  camera: null,
  box: null,
  // renderActions: new Set<() => void>(),
  // raycastingMeshes: [] as Mesh[],
  // init,
  // adjustWorldPosition,
  // render,
  // addOrbitControlGUI,
  // addObj,
  // removeObj,
  // getObjByEl,
  // addPass,
  // removePass,
  // addRenderAction,
  // removeRenderAction,
  // raycast,
  // addRaycastingTarget,
};

interface World {
  tick: number;
  renderer: WebGLRenderer | null;
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  composer: EffectComposer | null;
  box: Mesh | null;
}

const WorldContext = createContext(initialWorld);

interface WorldContextProps {
  children: React.ReactNode;
  background?: string;
}

export const WorldProvider: FC<WorldContextProps> = ({ children, background = null }) => {
  const [world, setWorld] = useState<World>(initialWorld);
  const worldRef = useRef(world); // ここでworldを追跡するrefを作成します
  const { viewport } = useViewport();

  useEffect(() => {
    worldRef.current = world;
  }, []);

  useLayoutEffect(() => {
    const init = () => {
      if (viewport.width === 0 || world.tick > 0) return;
      const canvas = viewport.canvas;
      if (!canvas) {
        throw new Error("WebGLRenderer needs a HTMLCanvasElement!");
      }

      // レンダラー
      let renderer = new WebGLRenderer({
        canvas,
        antialias: true,
        precision: isTouchDevices ? "highp" : "mediump",
      });
      renderer.setSize(viewport.width, viewport.height, false);
      renderer.setPixelRatio(viewport.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);

      // シーン
      let scene = new Scene();
      scene.background = background === null ? null : new Color(0xff0000);

      // カメラ
      const { fov, aspect, near, far, cameraZ } = viewport;
      let camera = new PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = cameraZ;

      // コンポーザー
      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Stats
      if (isDebug) {
        const stats = new Stats();
        document.body.appendChild(stats.dom);
      }

      ////////////////////////////////////////////////////////////////////////////
      // ボックスジオメトリー
      const boxGeometry = new BoxGeometry(
        viewport.width / 3,
        viewport.width / 3,
        viewport.width / 3,
      );
      const boxMaterial = new MeshLambertMaterial({
        color: "#2497f0",
      });
      const box = new Mesh(boxGeometry, boxMaterial);
      box.position.z = -5;
      box.rotation.set(10, 10, 10);
      scene.add(box);

      // ライト
      const ambientLight = new AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      const pointLight = new PointLight(0xffffff, 0.2);
      pointLight.position.set(1, 2, 3);
      scene.add(pointLight);

      ////////////////////////////////////////////////////////////////////////////

      setWorld({
        tick: world.tick,
        renderer,
        scene,
        camera,
        composer,
        box,
      });
    };
    init();

    return () => {};
  }, [viewport]);

  useLayoutEffect(() => {
    // アニメーション
    const clock = new Clock();
    const render = () => {
      const elapsedTime = clock.getElapsedTime();
      let currentWorld = worldRef.current;
      const box = currentWorld.box;
      if (box) {
        box.rotation.x = elapsedTime;
        box.rotation.y = elapsedTime;
      }
      setWorld((prev) => {
        const newWorld = {
          ...prev,
          tick: prev.tick++,
        };
        worldRef.current = newWorld;
        return newWorld;
      });
      if (currentWorld.renderer && currentWorld.scene && currentWorld.camera) {
        currentWorld.renderer.render(currentWorld.scene, currentWorld.camera);
      }
      requestAnimationFrame(render);
    };
    render();

    return () => {};
  }, []);

  return <WorldContext.Provider value={world}>{children}</WorldContext.Provider>;
};

export function useWorld() {
  return useContext(WorldContext);
}
