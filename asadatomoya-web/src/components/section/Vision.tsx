"use client";
import { useRef } from "react";

import SectionHeading from "@/components/SectionHeading";
import WebGl, { WebGlHandle } from "@/glsl/WebGl";

const Vision = () => {
  const sliderRef = useRef<WebGlHandle | null>(null);
  return (
    <section className="relative mx-auto max-w-5xl">
      <SectionHeading className="px-2 py-4">ビジョン</SectionHeading>
      <h3 className="font-20-36 px-2 font-serif">
        Webを通して、
        <span className="block sm:hidden"></span>
        新しい価値を社会に届ける。
        <div className="py-32"></div>
      </h3>
      <WebGl
        webgl="slider-world"
        texture={["/img/profile.jpg", "/img/profile2.jpg", "/img/profile3.jpg"]}
        className="relative top-1/2 mx-auto h-full w-11/12 -translate-y-1/2"
        ref={sliderRef}
      />
      <div className="font-50-120 absolute top-3/4 w-full -translate-y-1/2">
        <button
          className="mr-6 rotate-180 cursor-pointer border-none bg-none opacity-70"
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
            <circle cx="60" cy="60" r="59.5" stroke="black" />
            <path d="M85 61L47.5 82.6506L47.5 39.3494L85 61Z" fill="black" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 mr-6 -translate-y-1/2  cursor-pointer border-none bg-none opacity-70"
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
            <circle cx="60" cy="60" r="59.5" stroke="black" />
            <path d="M85 61L47.5 82.6506L47.5 39.3494L85 61Z" fill="black" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Vision;
