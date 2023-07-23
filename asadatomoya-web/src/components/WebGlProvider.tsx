"use client";
import { type FC, useRef } from "react";

import { ViewportProvider } from "@/context/ViewportContext";
import { WorldProvider } from "@/context/WorldContext";

interface WebGlProviderProps {
  children: React.ReactNode;
}

const WebGlProvider: FC<WebGlProviderProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <>
      <ViewportProvider canvasRef={canvasRef}>
        <WorldProvider>
          {children}
          <canvas
            id="canvas"
            className="fixed left-0 top-0 -z-20 h-screen w-screen"
            ref={canvasRef}
          ></canvas>
        </WorldProvider>
      </ViewportProvider>
    </>
  );
};

export default WebGlProvider;
