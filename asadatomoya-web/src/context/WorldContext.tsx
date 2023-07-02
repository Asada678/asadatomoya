"use client";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import { AxesHelper, Color, Event, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { isDebug, isTouchDevices } from "@utils";

import { Ob } from "@glsl/Ob";

import { useViewport } from "./ViewportContext";

interface World {
  tick: number;
  renderer: WebGLRenderer | null;
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  composer: EffectComposer | null;
  controls?: OrbitControls | null;
}

const initialWorld: World = {
  // raycaster: new Raycaster(),
  tick: 0,
  renderer: null,
  scene: null,
  composer: null,
  camera: null,
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

type AddOb = <T extends Ob>(obj: T) => void;
interface WorldContextProps {
  world: World;
  tick: number;
  ready: boolean;
  addOb: AddOb;
  // TODO グローバルにテクスチャを保持
}
const WorldContext = createContext<WorldContextProps | undefined>(undefined);

interface WorldProviderProps {
  children: React.ReactNode;
  background?: string;
}

export const WorldProvider: FC<WorldProviderProps> = ({ children, background = null }) => {
  const [world, setWorld] = useState<World>(initialWorld);
  const [tick, setTick] = useState(0);
  const [ready, setReady] = useState(false); // worldのsetupを検知するためのフラグ
  const { viewport } = useViewport();
  const [obs, setObs] = useState<Ob[]>([]);

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
      setReady(true);
    };

    init();

    return () => {};
  }, [viewport]);

  useLayoutEffect(() => {
    const render = () => {
      if (!ready) return;
      setTick((prev) => prev + 1);
      setWorld(world); // この行がないと動かない

      if (world.composer) {
        world.composer.render();
      }
      if (world.controls) {
        world.controls.update();
      }
      obs.forEach((ob) => {
        ob.scroll(viewport);
      });
      requestAnimationFrame(render);
    };

    render();

    return () => {};
  }, [ready, obs]);

  const addOb = useCallback<WorldContextProps["addOb"]>((ob) => {
    // TODO リサイズ時、sceneのchildrenを参照するか確認する
    setWorld((prev) => {
      const scene = prev.scene;
      if (prev.scene) {
        prev.scene.add(ob.mesh);
      }
      const w = {
        ...prev,
        scene,
      };
      return w;
    });
    setObs((prev) => [...prev, ob]);
  }, []);

  return (
    <WorldContext.Provider value={{ world, tick, ready, addOb }}>
      {isDebug && (
        <div>
          <h1 className="font-24-48 mt-8">tick: {tick}</h1>
          <h1 className="font-24-48 mt-8">obs.length: {obs.length}</h1>
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
  const { world, tick, ready, addOb } = context;
  return { world, tick, ready, addOb };
}
