"use client";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "@/components/Loader";
import SectionHr from "@/components/SectionHr";
import WebGlProvider from "@/components/WebGlProvider";
import Career from "@/components/section/Career";
import Hero from "@/components/section/Hero";
import Objective from "@/components/section/Objective";
import Profile from "@/components/section/Profile";
import Qualification from "@/components/section/Qualification";
import Vision from "@/components/section/Vision";

export default function Home() {
  const divRef = useRef(null);
  useEffect(() => {
    ScrollTrigger.create({
      trigger: divRef.current,
      // start: "top 80%",
      // end: "center center",
      onEnter() {
        gsap.from(divRef.current, {
          opacity: 0,
          y: 100,
          duration: 0.5,
          overwrite: true,
        });
      },
      onEnterBack() {},
    });

    return () => {};
  }, []);

  return (
    <WebGlProvider>
      <Loader />
      <div>
        <Hero />
        <SectionHr />
        <SectionHr />

        <Vision />
        <SectionHr />

        <div ref={divRef}>
          <Profile />
        </div>
        <SectionHr />

        <Career />
        <SectionHr />

        <Objective />
        <SectionHr />

        <Qualification />
        <SectionHr />
      </div>
    </WebGlProvider>
  );
}
