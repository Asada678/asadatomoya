"use client";

import { init } from "@glsl/template";

export default function WebGl() {
  const i = init();
  console.log("i:", i);
  return (
    <>
      <div id="loader" className="loader">
        <div className="loader-inner">
          <div className="loader-rect">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span className="loader-percent">0%</span>
        </div>
      </div>
      <div id="global-container">
        <div id="page-container">
          <section id="fv">
            <div className="fv__content">
              <div
                className="fv__text-shader"
                data-webgl="slider-wave"
                data-tex-1="/img/headline/fv__headline.png"
                data-tex-2="/img/headline/fv__slider_text_1.png"
                data-tex-3="/img/headline/fv__slider_text_2.png"
                data-tex-4="/img/headline/fv__slider_text_3.png"
                data-tex-5="/img/headline/fv__slider_text_4.png"
              ></div>
            </div>
            <div className="fv__main">
              <div className="fv__folder">
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
              <button className="fv__btn prev">
                <img src="/img/slide-nav.svg" alt="前へ" />
              </button>
              <button className="fv__btn next">
                <img src="/img/slide-nav.svg" alt="次へ" />
              </button>
            </div>
          </section>
        </div>
        <canvas id="canvas"></canvas>
      </div>
    </>
  );
}
