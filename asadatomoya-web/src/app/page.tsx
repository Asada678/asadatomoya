"use client";

import { useRef } from "react";

import MainHeading from "@components/MainHeading";
import SectionHeading from "@components/SectionHeading";
import SectionHr from "@components/SectionHr";
import Table from "@components/Table";
import WebGl, { WebGlHandle } from "@glsl/WebGl";

const profile = [
  { title: "氏名", value: "浅田 智哉" },
  { title: "生年月日", value: "1994/09/23" },
  { title: "性別", value: "男性" },
  { title: "職業", value: "エンジニア" },
  { title: "好きなスポーツ", value: "ラグビー、サッカー、野球" },
  // { title: "", value: "" },
];
const career = [
  { yyyyMM: "2001/03", value: "学校法人公文学園 のびてゆく幼稚園 卒園" },
  { yyyyMM: "2007/03", value: "高槻市立日吉台小学校 卒業" },
  { yyyyMM: "2010/03", value: "高槻市立芝谷中学校 卒業" },
  { yyyyMM: "2013/03", value: "大阪府立千里高等学校 卒業" },
  { yyyyMM: "2018/10", value: "大阪大学 歯学部 歯学科 中退" },
  { yyyyMM: "2021/03", value: "HAL大阪 情報処理学科 卒業" },
  { yyyyMM: "2021/04", value: "GMOペイメントゲートウェイ株式会社 入社" },
];

const objectiveHeader = ["", "目標", "現状", "期日"];
const objective = [
  { title: "日商簿記3級", value: ["合格", "未勉強", "2024/02/25"] },
  { title: "ベンチプレス", value: ["100kg", "90kg", "2024/03/31"] },
  { title: "スクワット", value: ["130kg", "110kg", "2024/03/31"] },
  { title: "デッドリフト", value: ["130kg", "110kg", "2024/03/31"] },
  { title: "日商簿記2級", value: ["合格", "未勉強", "2024/06/xx"] },
  { title: "体重", value: ["65kg未満", "63.6kg", "2044/09/23"] },
  { title: "体脂肪率", value: ["15%未満", "17.6%", "2044/09/23"] },
];

const qualification = [
  { yyyyMM: "2014/08", value: "第一種普通自動車運転免許" },
  { yyyyMM: "2019/05", value: "基本情報技術者" },
  { yyyyMM: "2019/06", value: "TOEIC L/R 865点" },
  { yyyyMM: "2019/12", value: "応用情報技術者" },
  { yyyyMM: "2022/01", value: "LinuCレベル1" },
  { yyyyMM: "2022/09", value: "ORACLE MASTER Silver DBA 2019" },
  { yyyyMM: "2023/02", value: "JSTQB Foundation Level" },
];

export default function Home() {
  const sliderRef = useRef<WebGlHandle | null>(null);
  return (
    <div className="py-6">
      <div className="relative mx-auto max-w-5xl" style={{ height: "60vh" }}>
        <MainHeading className="absolute top-0 left-0 py-4" />
        <WebGl
          webgl="slider-world"
          texture={["/img/profile.jpg", "/img/profile2.jpg", "/img/profile3.jpg"]}
          style={{ aspectRatio: "9/16" }}
          className="absolute top-1/2 -translate-y-1/2 mx-auto h-full w-11/12"
          ref={sliderRef}
        />
        <div className="font-50-120 absolute top-3/4 w-full -translate-y-1/2">
          <button
            className="mr-6 rotate-180 cursor-pointer border-none bg-none opacity-70"
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
            className="absolute right-0 top-1/2 mr-6 -translate-y-1/2  cursor-pointer border-none bg-none opacity-70"
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
      </div>
      <SectionHr />
      <SectionHr />

      <SectionHeading className="px-2 py-4">ビジョン</SectionHeading>
      <p className="font-20-36 px-2 font-serif">
        Webを通して、
        <span className="block sm:hidden"></span>
        新しい価値を社会に届ける。
      </p>
      <SectionHr />

      <SectionHeading className="px-2 py-4">プロフィール</SectionHeading>
      <div className="max-w-3xl px-2">
        {profile.map((p, i) => (
          <div className="items-center gap-4 border-b pb-2 pt-4 md:flex md:py-8" key={i}>
            <h3 className="font-16-20 mb-1 w-36 md:w-48">{p.title}</h3>
            <p className="font-20-24 font-bold">{p.value}</p>
          </div>
        ))}
      </div>
      <SectionHr />

      <SectionHeading className="px-2 py-4">経歴</SectionHeading>
      <div className="max-w-3xl px-2">
        {career.map((c, i) => (
          <div className="flex items-center gap-4 border-b pb-2 pt-4 md:py-4" key={i}>
            <p className="font-14-16 mb-1 w-16 md:w-48">{c.yyyyMM}</p>
            <p className="font-16-20 font-bold">{c.value}</p>
          </div>
        ))}
      </div>
      <SectionHr />

      <SectionHeading className="px-2 py-4">目標</SectionHeading>
      <div className="px-2">
        <p className="font-20-24 mb-2 font-serif">会計が分かるエンジニアになる。</p>
        <p className="font-20-24 mb-2 font-serif">健康的で強い体でいる。</p>
      </div>
      <Table header={objectiveHeader} data={objective} />
      <div className="text-right">
        <p className="py-2">2023/07/12時点</p>
      </div>
      <SectionHr />

      <SectionHeading className="px-2 py-4">資格</SectionHeading>
      <div className="max-w-3xl">
        <div className="flex items-center gap-4 border-b bg-gray-200 px-2 pb-2 pt-4 dark:bg-gray-700 md:py-4">
          <p className="font-14-16 mb-1 w-16 md:w-48">取得年月</p>
          <p className="font-16-20 font-bold">内容</p>
        </div>
        {qualification.map((c, i) => (
          <div className="flex items-center gap-4 border-b px-2 pb-2 pt-4 md:py-4" key={i}>
            <p className="font-14-16 mb-1 w-16 md:w-48">{c.yyyyMM}</p>
            <p className="font-16-20 font-bold">{c.value}</p>
          </div>
        ))}
      </div>
      <SectionHr />
    </div>
  );
}
