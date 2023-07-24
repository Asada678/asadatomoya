"use client";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

import WebGl from "@/glsl/WebGl";

const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // const trigger = ScrollTrigger.create({
    //   trigger: sectionRef.current,
    //   start: "top bottom",
    //   end: "top bottom",
    //   onEnter() {},
    // });
    const timeline = gsap
      .timeline()
      .to(sectionRef.current, { opacity: 1 })
      .from(bgRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 2.5,
      })
      .from(h1Ref.current, {
        opacity: 0,
        y: 40,
        duration: 0.3,
        delay: 0.3,
      })
      .from(pRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.3,
        delay: 0.3,
      })
      .from(githubRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
      });

    return () => {
      // trigger.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section className="relative h-screen max-h-[800px] opacity-0" ref={sectionRef}>
      <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 lg:px-0">
        <div className="absolute left-0 top-1/4 w-full max-w-2xl px-3 sm:pl-8">
          <h1 ref={h1Ref} className="font-48-90 font-black drop-shadow-2xl dark:text-gray-200">
            <span className="orange-gradient tracking-wider">浅田 智哉</span>
          </h1>
          <p
            ref={pRef}
            className="font-serif-jp font-16-20 mt-2 leading-relaxed text-gray-100 drop-shadow-2xl"
          >
            筋トレ・プログラミング・ラグビーが
            <br className="block sm:hidden" />
            好きなWebエンジニアです。
          </p>

          <div ref={githubRef} className="flex flex-col justify-end">
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
          texture={["/img/hero.jpg"]}
          className="absolute left-0 top-0 -z-10 h-full w-full"
          aspectVideo={false}
        />
        <div
          ref={bgRef}
          className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-r from-black via-black to-transparent opacity-60"
        ></div>
      </div>
    </section>
  );
};

export default Hero;
