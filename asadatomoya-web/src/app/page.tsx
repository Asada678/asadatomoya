"use client";

import MainHeading from "@components/MainHeading";
import SectionHeading from "@components/SectionHeading";
import SectionHr from "@components/SectionHr";
import Table from "@components/Table";
import WebGl from "@glsl/WebGl";

const profile = [
  { title: "氏名", value: "浅田 智哉" },
  { title: "生年月日", value: "1994/09/23" },
  { title: "性別", value: "男性" },
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
      <Table header={objectiveHeader} data={objective} />
      <div className="text-right">
        <p className="py-2">2023/07/12時点</p>
      </div>
      <SectionHr />
    </div>
  );
}
