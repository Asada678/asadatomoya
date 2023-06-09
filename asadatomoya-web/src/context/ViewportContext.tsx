"use client";
import React, {
  createContext,
  FC,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Viewport } from "@model";
import { config } from "@utils";

const initialViewport: Viewport = {
  canvas: null,
  width: 0,
  height: 0,
  near: 0,
  far: 0,
  cameraZ: 0,
  aspect: 0,
  rad: 0,
  fov: 0,
  devicePixelRatio: 1,
  isMobile: true,
  actions: new Set(),
  isLoaded: false,
};

interface ViewportContextType {
  viewport: Viewport;
  addResizeAction: (action: (viewport?: Viewport) => void) => void;
  removeResizeAction: (action: (viewport?: Viewport) => void) => void;
}

const ViewportContext = createContext<ViewportContextType | undefined>(undefined);

interface ViewportProviderProps {
  children: React.ReactNode;
  canvasRef: MutableRefObject<HTMLCanvasElement | undefined | null>;
  cameraZ?: number;
  near?: number;
  far?: number;
}

export const ViewportProvider: FC<ViewportProviderProps> = ({
  children,
  canvasRef,
  cameraZ = 2000,
  near = 1500,
  far = 4000,
}) => {
  const [viewport, setViewport] = useState<Viewport>(initialViewport);
  const viewportRef = useRef(viewport);

  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  useLayoutEffect(() => {
    const update = (canvasRef: MutableRefObject<HTMLCanvasElement | undefined | null>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas?.getBoundingClientRect();
      const height = rect?.height || 1;
      const width = rect?.width || 1;
      const rad = 2 * Math.atan(height / 2 / cameraZ);
      const newViewport: Viewport = {
        ...viewportRef.current,
        canvas,
        width,
        height,
        near,
        far,
        cameraZ,
        aspect: width / height,
        rad,
        fov: rad * (180 / Math.PI),
        devicePixelRatio: 1,
        isMobile: width < config.breakpoint.md,
        isLoaded: true,
      };
      setViewport(newViewport);
    };

    update(canvasRef);

    const onResize = () => {
      update(canvasRef);
      viewportRef.current.actions.forEach((action) => action(viewport));
    };

    let timerId: NodeJS.Timeout | null = null;
    const handleResize = () => {
      onResize();
      if (timerId !== null) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        onResize();
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);

  const addResizeAction = useCallback((action: (viewport?: Viewport) => void) => {
    setViewport((prev) => ({
      ...prev,
      actions: new Set(prev.actions).add(action),
    }));
  }, []);

  const removeResizeAction = useCallback((action: (viewport?: Viewport) => void) => {
    setViewport((prev) => {
      const newActions = new Set(prev.actions);
      newActions.delete(action);
      return { ...prev, actions: newActions };
    });
  }, []);

  return (
    <ViewportContext.Provider value={{ viewport, addResizeAction, removeResizeAction }}>
      {children}
    </ViewportContext.Provider>
  );
};

export function useViewport() {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewportはViewportProviderの内部から使用してください。");
  }
  const { viewport, addResizeAction, removeResizeAction } = context;
  return { viewport, addResizeAction, removeResizeAction };
}
