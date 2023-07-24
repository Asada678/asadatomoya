"use client";
import { useRef } from "react";

import { StepBack, StepForward } from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import WebGl, { WebGlHandle } from "@/glsl/WebGl";

const Vision = () => {
  const sliderRef = useRef<WebGlHandle>(null);

  return (
    <section>
      <SectionHeading className="px-2 py-4">ビジョン</SectionHeading>
      <h3 className="font-20-36 px-2 font-serif">
        Webを通して、
        <span className="block sm:hidden"></span>
        新しい価値を社会に届ける。
        <div className="py-16"></div>
      </h3>
      <div className="relative mx-auto max-w-5xl">
        <WebGl
          webgl="slider-world"
          texture={["/img/profile.jpg", "/img/profile2.jpg", "/img/profile3.jpg"]}
          className="mx-auto h-full w-full -translate-y-1/2"
          ref={sliderRef}
        />
        <div className="font-50-120 absolute left-0 top-3/4 flex w-full -translate-y-1/2 justify-end pr-4">
          <button
            className="mr-6 cursor-pointer rounded-full border  border-black text-black  dark:border-white dark:text-white"
            onClick={() => sliderRef.current?.prevSlide()}
          >
            <div className="relative h-[1em] w-[1em]">
              <StepBack
                className="absolute left-1/2 top-1/2 h-[0.6em] w-[0.6em] -translate-x-1/2 -translate-y-1/2"
                strokeWidth={1}
              />
            </div>
          </button>
          <button
            className="cursor-pointer rounded-full border  border-black text-black  dark:border-white dark:text-white"
            onClick={() => sliderRef.current?.nextSlide()}
          >
            <div className="relative h-[1em] w-[1em]">
              <StepForward
                className="absolute left-1/2 top-1/2 h-[0.6em] w-[0.6em] -translate-x-1/2 -translate-y-1/2"
                strokeWidth={1}
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Vision;
