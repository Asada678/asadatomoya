"use client";
import React, {
  createContext,
  FC,
  MutableRefObject,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import { config } from "@utils";

import { useViewport } from "./ViewportContext";

interface World {
  canvas: HTMLCanvasElement | undefined | null;
  width: number;
  height: number;
  near: number;
  far: number;
  cameraZ: number;
  aspect: number;
  rad: number;
  fov: number;
  devicePixelRatio: number;
  isMobile: boolean;
}

const world: World = {
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
};

const WorldContext = createContext(world);

interface WorldContextProps {
  children: React.ReactNode;
  // canvasRef: MutableRefObject<HTMLCanvasElement | undefined | null>;
  // cameraZ?: number;
  // near?: number;
  // far?: number;
}

export const WorldProvider: FC<WorldContextProps> = ({
  children,
  // canvasRef,
  // cameraZ = 2000,
  // near = 1500,
  // far = 4000,
}) => {
  const [worldData, setWorldData] = useState<World>(world);
  const { viewport } = useViewport();
  // console.log("world use viewport:", viewport);

  useLayoutEffect(() => {



    return () => {
    };
  }, []);

  return <WorldContext.Provider value={worldData}>{children}</WorldContext.Provider>;
};

export function useWorld() {
  return useContext(WorldContext);
}
