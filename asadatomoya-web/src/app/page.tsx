"use client";
import Link from "next/link";

import MainHeading from "@components/MainHeading";
import Table from "@components/Table";
import WebGl from "@glsl/WebGl";

export default function Home() {
  return (
    <div className="py-6">
      <MainHeading />
      <WebGl
        webgl="particles"
        texture={["/img/profile.jpg", "/img/profile.jpg"]}
        style={{ height: "70vh" }}
        aspectVideo={false}
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
      
      <Table
        header={["", "目標", "現状", "期日"]}
        data={[
          { title: "ベンチプレス", value: ["100kg", "90kg", "2024/03/31"] },
          { title: "スクワット", value: ["130kg", "110kg", "2024/03/31"] },
          { title: "デッドリフト", value: ["130kg", "110kg", "2024/03/31"] },
          { title: "体重", value: ["65kg未満", "63.6kg", "2044/09/23"] },
          { title: "体脂肪率", value: ["15%未満", "17.6%", "2044/09/23"] },
        ]}
      />
    </div>
  );
}
