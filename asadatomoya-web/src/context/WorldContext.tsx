"use client";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import {
  AmbientLight,
  AxesHelper,
  Color,
  Event,
  Object3D,
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

interface World {
  tick: number;
  renderer: WebGLRenderer | null;
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  composer: EffectComposer | null;
  webGlObjects: Object3D<Event>[];
  controls?: OrbitControls | null;
}

const initialWorld: World = {
  // raycaster: new Raycaster(),
  tick: 0,
  renderer: null,
  scene: null,
  composer: null,
  camera: null,
  webGlObjects: [],
  controls: null,
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

interface WorldContextProps {
  world: World;
  // tick: number;
  addWebGlObject: (...obj: Object3D<Event>[]) => void;
}
const WorldContext = createContext<WorldContextProps | undefined>(undefined);

interface WorldProviderProps {
  children: React.ReactNode;
  background?: string;
}

export const WorldProvider: FC<WorldProviderProps> = ({ children, background = null }) => {
  const [world, setWorld] = useState<World>(initialWorld);
  const [isSetup, setIsSetup] = useState(false); // worldのsetupを検知するためのフラグ
  const { viewport } = useViewport();

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

      let controls: OrbitControls | null = null;
      if (isDebug) {
        const stats = new Stats();
        document.body.appendChild(stats.dom);
        controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
        const axesHelper = new AxesHelper(1000);
        scene.add(axesHelper);
      }

      //TODO//////////////////////////////////////////////////////////////////////////

      // ライト
      const ambientLight = new AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      const pointLight = new PointLight(0xffffff, 0.2);
      pointLight.position.set(1, 2, 3);
      scene.add(pointLight);

      ////////////////////////////////////////////////////////////////////////////

      setWorld((prev) => {
        const w = {
          ...prev,
          renderer,
          scene,
          camera,
          composer,
          controls,
        };
        return w;
      });
      setIsSetup(true);
    };

    init();

    return () => {};
  }, [viewport]);

  useLayoutEffect(() => {
    const render = () => {
      if (!isSetup) return;

      setWorld((prev) => {
        const newWorld = {
          ...prev,
          tick: prev.tick + 1,
        };
        return newWorld;
      });

      if (world.composer) {
        world.composer.render();
      }
      if (world.controls) {
        world.controls.update();
      }
      requestAnimationFrame(render);
    };

    render();

    return () => {};
  }, [isSetup]);

  const addWebGlObject = useCallback((obj: Object3D<Event>) => {
    setWorld((prev) => {
      const scene = prev.scene;
      if (prev.scene) {
        prev.scene.add(obj);
      }
      const webGlObjects = [...prev.webGlObjects, obj];
      const w = {
        ...prev,
        scene,
        webGlObjects,
      };
      return w;
    });
  }, []);

  return (
    <WorldContext.Provider value={{ world, addWebGlObject }}>
      {isDebug && (
        <div>
          <h1 className="font-24-48 mt-8">world.tick: {world.tick}</h1>
          <h1 className="font-24-48 mt-8">
            world.webGlObjects.length: {world.webGlObjects.length}
          </h1>
        </div>
      )}
      {children}
    </WorldContext.Provider>
  );
};

export function useWorld() {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error("useWorldはWorldProviderの内部から使用してください。");
  }
  const { world, addWebGlObject } = context;
  return { world, addWebGlObject };
}
