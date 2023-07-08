"use client";
import { useRef } from "react";

import { config } from "@utils";

import SectionHr from "@components/SectionHr";
import SectionTitle from "@components/SectionTitle";
import { useViewport } from "@context/ViewportContext";
import WebGl, { WebGlHandle } from "@glsl/WebGl";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function NotEqual() {
  const sliderRef = useRef<WebGlHandle | null>(null);
  const { viewport } = useViewport();
  const iconSize = viewport.width < config.breakpoint ? 20 : 36;
  return (
    <>
      <section id="fv" className="relative h-screen">
        <div className="font-48-110 absolute left-1/2 top-1/4 mx-auto w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-x-hidden text-center xl:bottom-16 xl:left-0 xl:top-auto xl:max-w-5xl xl:transform-none xl:text-left">
          <div className="block">
            <p className="font-14-16">Produced by Not Equal</p>
            <h1
              className="font-montserrat relative mt-6 font-bold leading-none"
              data-mouse="highlight"
              data-mouse-scale="4"
            >
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
              webgl="ray-marching"
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
              <div className="mt-12 pr-6 text-right">
                <button className="font-16-24 w-36 rounded-3xl border border-white px-2 py-3 transition-[letter-spacing] transition-colors duration-200 hover:border-blue-600 hover:bg-blue-600 hover:tracking-widest hover:text-white xl:w-48">
                  <span>more</span>
                  <ArrowRightIcon className="inline-block" width={iconSize} height={iconSize} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionHr />
      <section id="diverse" className="min-h-screen">
        <div className="font-16-24 flex flex-col xl:flex-row xl:items-center">
          <div className="flex grow basis-1/2 flex-col items-center text-center xl:text-left">
            <div className="mx-auto max-w-md">
              <SectionTitle>diverse</SectionTitle>
              <p className="diverse__desc" data-scroll-trigger="fade">
                他とは違う少し変わったウェブサイトで差を付けよう。
                <br className="sm-hidden" />
                あなただけのエフェクトを簡単にWebサイトに組み込もう。
              </p>
              <div className="mt-12 pr-6 text-right">
                <button className="font-16-24 transition-[letter-spacing w-36 rounded-3xl border border-white px-2 py-3 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:tracking-widest hover:text-white xl:w-48">
                  <span>more</span>
                  <ArrowRightIcon className="inline-block" width={iconSize} height={iconSize} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex grow basis-1/2 flex-col">
            <div className="relative mx-auto flex h-[40vh] w-full items-center xl:h-[50vh]">
              <WebGl
                webgl="particles"
                texture={["/img/sample/tree.jpg", "/img/sample/sea.jpg"]}
                className="mx-auto mb-6 aspect-video w-full max-w-sm xl:m-0 xl:max-w-none"
              />
            </div>
          </div>
        </div>
        <div></div>
      </section>
      <SectionHr />
      <section
        id="skill"
        className="relative flex items-start px-4 py-16 text-center xl:h-screen xl:text-left"
      >
        <div className="w-full">
          <div className="">
            <SectionTitle className="">skill</SectionTitle>
            <p className="font-16-20 mx-auto max-w-md xl:m-0">
              クリエイティブでインタラクティブな表現を
              <br className="sm-hidden" />
              WebGLを使ってそのままの形で実現する。
            </p>
          </div>
          <div className="font-14-20 relative mx-auto mt-16 h-72 w-96 text-center">
            <WebGl
              webgl="slider-reflect"
              texture={[
                "/img/sample/dog.jpg",
                "/img/sample/tree.jpg",
                "/img/sample/sea.jpg",
                "/img/sample/cat.jpg",
                "/img/sample/mountain.jpg",
              ]}
              className="aspect-video w-full"
            />
          </div>
          <div className="font-14-20 mx-auto mt-4 w-full max-w-md overflow-hidden py-4 text-center leading-none xl:absolute xl:bottom-0 xl:right-0 xl:px-8 xl:py-4 xl:text-right">
            <ul className="relative min-h-[248px] w-full list-none">
              <li className="absolute left-0 top-0 h-full w-full opacity-100">
                <h3 className="font-36-48 mb-1 font-bold">
                  <span className="text-[1.5em]">01</span>
                  正規化
                </h3>
                <p className="font-14-20 mx-auto text-justify leading-relaxed xl:m-auto xl:w-full">
                  正規化とはデータを一定のルールに基づいて、利用しやすい形に変形すること。WebGLにおいては正規化によってベクトルの長さを１にしたり、ある変数の取りうる値の範囲を-1
                  ~ 1にします。
                </p>
              </li>
              <li className="absolute left-0 top-0 h-full w-full opacity-0">
                <h3 className="font-36-48 mb-1 font-bold">
                  <span className="text-[1.5em]">02</span>
                  座標
                </h3>
                <p className="font-14-20 mx-auto text-justify leading-relaxed xl:m-auto xl:w-full">
                  座標とは空間内の点の位置を一意に指定するための数の組みで、WebGLにおいては頂点やテクスチャ画像の位置を指定するために使用されます。
                </p>
              </li>
              <li className="absolute left-0 top-0 h-full w-full opacity-0">
                <h3 className="font-36-48 mb-1 font-bold">
                  <span className="text-[1.5em]">03</span>
                  ベクトル
                </h3>
                <p className="font-14-20 mx-auto text-justify leading-relaxed xl:m-auto xl:w-full">
                  数学、物理学においてベクトルは大きさと方向を持つ量で、幾何学的に矢印としてイメージされます。WebGLにおいては頂点の座標やカメラや光の向きの表現に利用されます。
                </p>
              </li>
              <li className="absolute left-0 top-0 h-full w-full opacity-0">
                <h3 className="font-36-48 mb-1 font-bold">
                  <span className="text-[1.5em]">04</span>
                  線形補間
                </h3>
                <p className="font-14-20 mx-auto text-justify leading-relaxed xl:m-auto xl:w-full">
                  線形補間とは、既知の2点の間に存在する値を線形である１次関数を用いて近似的に求める手法です。WebGLでは各フラグメントには線形補間された値が渡ってきます。
                </p>
              </li>
              <li className="absolute left-0 top-0 h-full w-full opacity-0">
                <h3 className="font-36-48 mb-1 font-bold">
                  <span className="text-[1.5em]">05</span>
                  行列
                </h3>
                <p className="font-14-20 mx-auto text-justify leading-relaxed xl:m-auto xl:w-full">
                  行列とは数や記号を縦と横に矩形に配列したものです。WebGLにおいては頂点の座標を表すベクトルと掛け合わせることで、ベクトルの回転や長さの変更を行うことができます。
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
