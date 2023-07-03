"use client";
import Link from "next/link";

import MainHeading from "@components/MainHeading";
import WebGl from "@glsl/WebGl";

export default function Home() {
  return (
    <div className="py-6">
      <MainHeading />
      <WebGl
        webgl="particles"
        texture={["/img/profile.jpg", "/img/profile.jpg"]}
        style={{ height: "70vh" }}
      />
      <p>1994/09/23</p>
      <p>rugby, soccer, baseball</p>
      <Link href={"/career"} className="hover:bg-blue-50 hover:text-blue-600 hover:underline">
        Career
      </Link>
      <Link
        href={"/webgl"}
        className="font-20-40 hover:bg-blue-50 hover:text-blue-600 hover:underline"
      >
        WebGL
      </Link>
    </div>
  );
}
