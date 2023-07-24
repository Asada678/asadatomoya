"use client";
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

  return (
    <WebGlProvider>
      <Loader />
      <div>
        <Hero />
        <SectionHr />
        <SectionHr />

        <Vision />
        <SectionHr />

          <Profile />
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
