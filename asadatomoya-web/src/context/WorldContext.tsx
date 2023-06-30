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
}

const WorldContext = createContext(initialWorld);

interface WorldContextProps {
  children: React.ReactNode;
  background?: string;
}

export const WorldProvider: FC<WorldContextProps> = ({ children, background = null }) => {
  const [world, setWorld] = useState<World>(initialWorld);
  const worldRef = useRef(world); // ここでworldを追跡するrefを作成します
  const animationFrameId = useRef<number | null>(null);
  const { viewport } = useViewport();
  let canvas: HTMLElement;

  // useEffect(() => {
  //   canvas = viewport.canvas;
  // }, [viewport]);

  useEffect(() => {
    worldRef.current = world;
  }, [world]);

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

      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      ////////////////////////////////////////////////////////////////////////////
      // ボックスジオメトリー
      const boxGeometry = new BoxGeometry(300, 300, 300);
      const boxMaterial = new MeshLambertMaterial({
        color: "#2497f0",
      });
      const box = new Mesh(boxGeometry, boxMaterial);
      box.position.z = -5;
      box.rotation.set(10, 10, 10);
      scene.add(box);

      setWorld({
        tick: world.tick,
        renderer,
        scene,
        camera,
        composer,
      });

      // アニメーション
      const clock = new Clock();
      const render = () => {
        const elapsedTime = clock.getElapsedTime();
        box.rotation.x = elapsedTime;
        box.rotation.y = elapsedTime;

        const currentWorld = worldRef.current;
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
        // animationFrameId.current = requestAnimationFrame(render);
      };
      render();

      if (isDebug) {
        const stats = new Stats();
        document.body.appendChild(stats.dom);
      }
    };
    init();

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [viewport]);

  // useLayoutEffect(() => {
  //   const render = () => {
  //     const currentWorld = worldRef.current;
  //     setWorld((prev) => {
  //       const newWorld = {
  //         ...prev,
  //         tick: prev.tick++,
  //       };
  //       worldRef.current = newWorld;
  //       return newWorld;
  //     });
  //     if (currentWorld.renderer && currentWorld.scene && currentWorld.camera) {
  //       currentWorld.renderer.render(currentWorld.scene, currentWorld.camera);
  //     }
  //     animationFrameId.current = requestAnimationFrame(render);
  //   };

  //   // render();

  //   return () => {
  //     if (animationFrameId.current !== null) {
  //       cancelAnimationFrame(animationFrameId.current);
  //     }
  //   };
  // }, []);

  return <WorldContext.Provider value={world}>{children}</WorldContext.Provider>;
};

export function useWorld() {
  return useContext(WorldContext);
}
