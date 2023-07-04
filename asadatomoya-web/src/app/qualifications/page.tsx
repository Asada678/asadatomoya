"use client";
import { useRef } from "react";

import WebGl, { WebGlHandle } from "@glsl/WebGl";

export default function Qualifications() {
  const sliderRef = useRef<WebGlHandle | null>(null);
  return (
    <div className="">
      <p>qualifications</p>
      <div className="h-screen">
        <div className="py-32"></div>
        <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
          <WebGl
            webgl="slider-world"
            texture={[
              "/img/profile.jpg",
              "/img/sample/tree.jpg",
              "/img/sample/dog.jpg",
              "/img/sample/sea.jpg",
            ]}
            className="aspect-video w-full"
            ref={sliderRef}
          />
        </div>
        <div className="bg-white py-2 text-center">
          <button className="bg-red-500 px-16 py-4" onClick={() => sliderRef.current?.prevSlide()}>
            prev
          </button>
          <button
            className="bg-green-500 px-16 py-4"
            onClick={() => sliderRef.current?.nextSlide()}
          >
            next
          </button>
        </div>
      </div>

      {/* <div className="relative mx-auto min-h-screen max-w-xl">
        <WebGl
          webgl="particles"
          texture={["/img/sample/sea.jpg", "/img/sample/dog.jpg"]}
          className="aspect-square w-full"
        />
      </div>
      <div className="relative mx-auto min-h-screen max-w-xl">
        <WebGl
          webgl="particles"
          texture={["/img/sample/sea.jpg", "/img/sample/dog.jpg"]}
          className="aspect-square w-full"
        />
      </div> */}
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
}
