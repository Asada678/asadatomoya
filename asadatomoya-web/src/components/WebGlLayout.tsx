"use client";
import { type FC, useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

import { ViewportProvider } from "@context/ViewportContext";
import { WorldProvider } from "@context/WorldContext";

import Background from "./Background";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const SCROLL_WRAPPER = "scroll-wrapper";

const Layout: FC<LayoutProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const scrollWrapper = document.getElementById(SCROLL_WRAPPER);
    if (scrollWrapper) {
      const scrollbar = Scrollbar.init(scrollWrapper, { delegateTo: document, damping: 0.06 });
      ScrollTrigger.scrollerProxy(scrollWrapper, {
        scrollTop(value) {
          if (arguments.length && value) {
            scrollbar.scrollTop = value;
          }
          return scrollbar.scrollTop;
        },

      });
    }
    return () => {};
  }, []);

  return (
    <>
      <ViewportProvider canvasRef={canvasRef}>
        <WorldProvider>
          <div id={SCROLL_WRAPPER} className="h-screen overflow-hidden">
            <Navbar />
            <canvas
              id="canvas"
              className="fixed left-0 top-0 -z-20 h-screen w-screen"
              ref={canvasRef}
            ></canvas>
            {children}
          </div>
          <Background />
        </WorldProvider>
      </ViewportProvider>
    </>
  );
};

export default Layout;
