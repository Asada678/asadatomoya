"use client";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { AxesHelper, Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { gui, isDebug, isTouchDevices } from "@utils";

import { ObType } from "@glsl/Ob";

import { useViewport } from "./ViewportContext";

interface World {
  tick: number;
  renderer: WebGLRenderer | null;
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  composer: EffectComposer | null;
  controls: OrbitControls | null;
  axesHelper: AxesHelper | null;
}

const initialWorld: World = {
  // raycaster: new Raycaster(),
  tick: 0,
  renderer: null,
  scene: null,
  composer: null,
  camera: null,
  controls: null,
  axesHelper: null,
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

type ObAction = (obj: ObType) => void;
interface WorldContextProps {
  world: World;
  tick: number;
  ready: boolean;
  addOb: ObAction;
  removeOb: (id: string) => void;
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
  const [obs, setObs] = useState<ObType[]>([]);

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

      setWorld((prev) => {
        const w = {
          ...prev,
          renderer,
          scene,
          camera,
          composer,
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
        ob.render(tick);
      });
      requestAnimationFrame(render);
    };

    render();

    return () => {};
  }, [ready, obs]);

  useEffect(() => {
    if (!ready) return;
    const initGui = async () => {
      if (isDebug) {
        gui.init();
        addOrbitControls();
      }
    };
    const addOrbitControls = () => {
      gui.add((gui) => {
        const isActive = { value: false };

        gui
          .add(isActive, "value")
          .name("OrbitControl")
          .onChange(() => {
            if (world.scene == null || world.camera == null || world.renderer == null) return;
            if (isActive.value) {
              world.axesHelper = new AxesHelper(1000);
              world.scene.add(world.axesHelper);
              world.controls = new OrbitControls(world.camera, world.renderer.domElement);
              world.renderer.domElement.style.zIndex = "1";
            } else {
              world.axesHelper?.dispose();
              world.controls?.dispose();
              world.renderer.domElement.style.zIndex = "-1";
            }
          });
      });
    };

    const initStats = () => {
      if (isDebug) {
        const stats = new Stats();
        document.body.appendChild(stats.dom);
      }
    };

    initGui();
    initStats();

    return () => {};
  }, [ready]);

  useEffect(() => {
    const addGui = () => {
      if (!isDebug) return;
      // TODO ページ遷移した時、前のページのfolderが残ってしまう
      gui.add((gui) => {
        obs.forEach((o) => {
          if (!o.debug) return;
          const webglId = `${o.webgl}: ${o.id}`;
          const folderTitles = gui.folders.map((f) => f._title);
          if (!folderTitles.includes(webglId)) {
            const folder = gui.addFolder(webglId);
            o.debug(folder);
            folder.close();
          }
        });
      });
    };
    addGui();

    return () => {};
  }, [obs]);

  const addOb = useCallback<WorldContextProps["addOb"]>(
    (ob) => {
      // TODO リサイズ時、sceneのchildrenを参照するか確認する
      world.scene?.add(ob.mesh);
      setObs((prev) => [...prev, ob]);
      //TODO afterInitを実行する場所が良くない
      ob.afterInit();
    },
    [ready],
  );

  const removeOb = useCallback<WorldContextProps["removeOb"]>(
    (targetId) => {
      setObs((prevObs) => {
        const targetOb = prevObs.find((ob) => ob.id === targetId);
        if (targetOb) {
          world.scene?.remove(targetOb.mesh);
        }
        return prevObs.filter((ob) => ob.id !== targetId);
      });
    },
    [ready],
  );

  return (
    <WorldContext.Provider value={{ world, tick, ready, addOb, removeOb }}>
      {isDebug && (
        <div className="fixed bottom-3 pl-2">
          <h3 className="font-14-16">tick: {tick}</h3>
          <h3 className="font-14-16">obs.length: {obs.length}</h3>
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
  const { world, tick, ready, addOb, removeOb } = context;
  return { world, tick, ready, addOb, removeOb };
}
