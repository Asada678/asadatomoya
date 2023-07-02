"use client";
import { type FC, useRef } from "react";

import { ViewportProvider } from "@context/ViewportContext";
import { WorldProvider } from "@context/WorldContext";

import Background from "./Background";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <ViewportProvider canvasRef={canvasRef}>
        <WorldProvider>
          <div>
            <Navbar />
            <canvas
              id="canvas"
              className="fixed left-0 top-0 -z-20 h-screen w-screen"
              ref={canvasRef}
            ></canvas>
            {children}
            <Background />
          </div>
        </WorldProvider>
      </ViewportProvider>
    </>
  );
};

export default Layout;
