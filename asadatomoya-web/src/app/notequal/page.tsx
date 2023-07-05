"use client";
import { useRef } from "react";

import WebGl, { WebGlHandle } from "@glsl/WebGl";

export default function NotEqual() {
  const sliderRef = useRef<WebGlHandle | null>(null);
  const nextSlide = sliderRef.current?.nextSlide;
  return (
    <section className="relative h-screen">
      <div className="font-48-110 absolute left-1/2 top-1/4 mx-auto w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-x-hidden text-center xl:left-0 xl:text-left xl:bottom-16 xl:top-auto xl:max-w-5xl xl:transform-none">
        <div className="block">
          <p className="font-14-16">Produced by Not Equal</p>
          <h1 className="relative mt-6 font-bold" data-mouse="highlight" data-mouse-scale="4">
            <span>
              Make It
              <br />
              Different
            </span>
          </h1>
          <p className="font-16-24 pt-2">
            Not Equalではご覧のサイトを作りながら、最先端のWeb制作技術について学びます。
          </p>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 xl:flex xl:top-[40%] xl:h-screen xl:items-center">
        <div className="relative mx-auto w-full max-w-2xl xl:mb-10 xl:w-3/5 xl:max-w-5xl">
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
      </div>
      <div className="font-50-120 absolute bottom-5 right-5 w-full text-right">
        <button
          className="prev rotate-180 cursor-pointer border-none bg-none opacity-70"
          onClick={() => sliderRef.current?.prevSlide()}
        >
          <svg
            style={{ width: "1em", height: "1em" }}
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="59.5" stroke="white" />
            <path d="M85 61L47.5 82.6506L47.5 39.3494L85 61Z" fill="white" />
          </svg>
        </button>
        <button
          className="prev cursor-pointer border-none bg-none opacity-70"
          onClick={() => sliderRef.current?.nextSlide()}
        >
          <svg
            style={{ width: "1em", height: "1em" }}
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="59.5" stroke="white" />
            <path d="M85 61L47.5 82.6506L47.5 39.3494L85 61Z" fill="white" />
          </svg>
        </button>
      </div>
    </section>
  );
}
