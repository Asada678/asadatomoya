"use client";
import { useEffect } from "react";

import config from "next/config";
import Image from "next/image";
import Link from "next/link";

import { detect } from "detect-browser";
import { gsap } from "gsap";
import { Mesh } from "three";

import { cn } from "asadatomoya-common/utils";

import { gui, INode, utils, viewport } from "@utils";

import MainHeading from "@components/MainHeading";
import world from "@glsl/world";

// import loader from "#/component/loader";
// import menu from "#/component/menu";
// import mouse from "#/component/mouse";
// import { registScrollAnimations } from "#/component/scroll-animation";
// import scroller from "#/component/scroller";

export default function WebGl() {
  // const i = init();
  // console.log("i:", i);
  return (
    <>
      <div>
        <section className="fv">
          <div
            className="fv__content"
            data-mouse="highlight"
            data-mouse-scale="3"
          >
            <div className="fv__text-letter">
              <p className="fv__sub-title">Produced</p>
              <h1
                className="fv__title"
                data-mouse="highlight"
                data-mouse-scale="4"
              >
                <span className="fv__title-text">
                  <br />
                </span>
              </h1>
              <p className="fv__desc"></p>
            </div>
            <div
              className="fv__text-shader"
              data-webgl="slider-wave"
              data-tex-1="/img/headline/fv__headline.png"
              data-tex-2="/img/headline/fv_slider_text_1.png"
              data-tex-3="/img/headline/fv_slider_text_2.png"
              data-tex-4="/img/headline/fv_slider_text_3.png"
              data-tex-5="/img/headline/fv_slider_text_4.png"
            ></div>
          </div>
          <div className="fv__main">
            <div className="fv__holder">
              <div
                className="fv__slider slider"
                data-webgl="slider-world"
                data-tex-1="/movie/turtle.mp4"
                data-tex-2="/img/slider/slider_1.jpg"
                data-tex-3="/img/slider/slider_2.jpg"
                data-tex-4="/img/slider/slider_3.jpg"
                data-tex-5="/img/slider/slider_5.jpg"
              ></div>
            </div>
          </div>
          <div className="fv__nav">
            <button className="fv__btn prev" data-mouse="stuck">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="60" cy="60" r="59.5" stroke="white" />
                <path
                  d="M85 61L47.5 82.6506L47.5 39.3494L85 61Z"
                  fill="white"
                />
              </svg>
            </button>
            <button className="fv__btn next" data-mouse="stuck">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="60" cy="60" r="59.5" stroke="white" />
                <path
                  d="M85 61L47.5 82.6506L47.5 39.3494L85 61Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </section>
      </div>
      <canvas id="canvas"></canvas>
    </>
  );
}

// サイト全体の初期化処理
// async function init() {
//   try {
//     const canvas = INode.getElement(config.$.canvas);
//     const pageEl = INode.getElement(config.$.pageContainer);
//     const pageType = INode.getDS(pageEl, config.prefix.page);

//     if (window.debug) {
//       await gui.init();
//     }

//     // ビューポート情報の初期化
//     viewport.init(canvas, 2000, 1500, 4000);

//     // パフォーマンスモードの初期化
//     await utils.definePerformanceMode(3, 60);

//     // サイトのスクローラーの初期化
//     scroller.init();

//     // ローダーの初期化
//     loader.init();

//     // ローディングの進捗情報をパーセントで表示
//     const loaderPercent = INode.getElement(".loader-percent");
//     loader.addProgressAction((progress, total) => {
//       loaderPercent.innerHTML = Math.round((progress / total) * 100) + "%";
//     });

//     // 画像や動画（data-tex-〇としてHTMLに設定されているもの）の読み込み開始
//     await loader.loadAllAssets();

//     // Three.js（WebGL）の初期化
//     const bgColor = "none";
//     await world.init(canvas, viewport, bgColor);

//     // lil-guiへのエフェクトのパラメータ追加
//     addGUI(world);

//     // ページ属性（data-page）をキーにしたページ毎の制御の初期化
//     await import(`./page/${pageType}.js`).then(({ default: init }) => {
//       return init({ world, mouse, menu, loader, viewport, scroller });
//     });

//     // マウス制御の初期化
//     mouse.init(false, true);

//     // 画面サイズの変更に伴う処理の追加
//     viewport.addResizeAction(() => {
//       world.adjustWorldPosition(viewport);

//       mouse.resize();
//     });

//     // requestAnimationFrame毎に呼び出したい処理の追加
//     world.addRenderAction(() => {
//       mouse.render();

//       // レイキャスティング
//       world.raycast();
//     });

//     // スクロールに伴うアニメーションの初期化（gsap/ScrollTriggerへの登録）
//     registScrollAnimations();

//     // menuの初期化
//     menu.init(world, scroller);

//     // requestAnimationFrameによるThree.jsの描写開始
//     world.render();

//     // ローディングアニメーションの開始
//     await loader.letsBegin();

//     // ローディング完了後のアクション
//     mouse.makeVisible();
//   } catch (e) {
//     // tryブロックでエラーが発生した際にはこちらに飛ぶ
//     console.error(e);
//     debugger;
//   }
// }
