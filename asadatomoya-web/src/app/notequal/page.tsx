"use client";
import { useRef } from "react";

import SectionHr from "@components/SectionHr";
import SectionTitle from "@components/SectionTitle";
import WebGl, { WebGlHandle } from "@glsl/WebGl";

export default function NotEqual() {
  const sliderRef = useRef<WebGlHandle | null>(null);
  return (
    <>
      <section id="fv" className="relative h-screen">
        <div className="font-48-110 absolute left-1/2 top-1/4 mx-auto w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-x-hidden text-center xl:bottom-16 xl:left-0 xl:top-auto xl:max-w-5xl xl:transform-none xl:text-left">
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
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 xl:top-[40%] xl:flex xl:h-screen xl:items-center">
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
            className="prev mr-6 rotate-180 cursor-pointer border-none bg-none opacity-70"
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
      <SectionHr />
      <section id="vision" className="">
        <SectionTitle className="xl:hidden">vision</SectionTitle>
        <div className="flex flex-col xl:flex-row">
          <div className="relative flex grow basis-1/2 flex-col">
            <WebGl
              webgl="particles"
              texture={["/img/sample/dog.jpg", "/img/sample/dog.jpg"]}
              className="mx-auto mb-6 aspect-video w-full max-w-sm xl:m-0 xl:max-w-none"
            />
          </div>
          <div className="font-16-24 relative flex grow basis-1/2 items-center justify-center xl:text-left">
            <div className="mx-auto max-w-xl">
              <SectionTitle className="hidden xl:block">vision</SectionTitle>
              <p className="mb-4" data-scroll-trigger="fade">
                WebGLをわかりやすく解説し、多くのエンジニアに身近に感じてもらう。
              </p>
              <p className="" data-scroll-trigger="fade">
                WebGLを一般的な選択肢として普及させ、Web制作業界の表現の幅を広げる。
              </p>
            </div>
          </div>
        </div>
      </section>
      <SectionHr />
    </>
  );
}
