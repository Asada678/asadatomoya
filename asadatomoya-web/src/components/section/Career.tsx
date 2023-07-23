import SectionHeading from "@/components/SectionHeading";

const career = [
  { yyyyMM: "2001/03", value: "学校法人公文学園 のびてゆく幼稚園 卒園" },
  { yyyyMM: "2007/03", value: "高槻市立日吉台小学校 卒業" },
  { yyyyMM: "2010/03", value: "高槻市立芝谷中学校 卒業" },
  { yyyyMM: "2013/03", value: "大阪府立千里高等学校 卒業" },
  { yyyyMM: "2018/10", value: "大阪大学 歯学部 歯学科 中退" },
  { yyyyMM: "2021/03", value: "HAL大阪 情報処理学科 卒業" },
  { yyyyMM: "2021/04", value: "GMOペイメントゲートウェイ株式会社 入社" },
];

const Career = () => {
  return (
    <section>
      <SectionHeading className="px-2 py-4">経歴</SectionHeading>
      <div className="max-w-3xl px-2">
        {career.map((c, i) => (
          <div className="flex items-center border-b pb-2 pt-4 md:py-4" key={i}>
            <p className="w-16 md:w-48">{c.yyyyMM}</p>
            <p className="font-bold">{c.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;
