"use client";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

import WebGl from "@/glsl/WebGl";
import { isDebug } from "@/utils";

const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: h1Ref.current,
        start: "top top",
        markers: isDebug,
        onEnter() {
          gsap.to(h1Ref.current, {
            opacity: 1,
          });
        },
        onEnterBack() {},
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section className="relative h-screen max-h-[800px]">
      <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 lg:px-0">
        <div className="absolute left-0 top-1/4 w-full max-w-2xl px-3 sm:pl-8">
          <h1 ref={h1Ref} className="font-48-90 font-black drop-shadow-2xl dark:text-gray-200">
            <span className="orange-gradient tracking-wider">浅田 智哉</span>
          </h1>
          <p className="font-serif-jp font-16-20 mt-2 leading-relaxed text-gray-100 drop-shadow-2xl">
            筋トレ・プログラミング・ラグビーが
            <br className="block sm:hidden" />
            好きなWebエンジニアです。
          </p>

          <div className="flex flex-col justify-end">
            <p className="font-serif-jp font-12-14 mt-8 text-gray-100 sm:mt-12">
              このサイトのソースコードはこちら
            </p>
            <a
              href="https://github.com/Asada678/asadatomoya"
              target="_blank"
              className="group mt-2 flex w-48 items-center justify-center rounded-3xl bg-orange-200 py-2 text-gray-900 transition-colors duration-300 hover:bg-orange-300 sm:w-56 sm:py-3"
            >
              <span className="font-bold tracking-wide">GitHub</span>
              <ExternalLink className="ml-2 h-4 w-4 duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <WebGl
          webgl="particles"
          texture={["/img/hero.jpg", "/img/hero2.jpg"]}
          className="absolute left-0 top-0 -z-10 h-full w-full scale-x-[-1] transform"
          aspectVideo={false}
          scrollAction="progressParticles"
        />
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-r from-black via-black to-transparent opacity-60"></div>
      </div>
    </section>
  );
};

export default Hero;
