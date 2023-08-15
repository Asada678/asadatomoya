import SectionHeading from "@/components/SectionHeading";

const objectiveHeader = ["", "目標", "現状", "期日"];
const objective = [
  { title: "日商簿記3級", value: ["合格", "未勉強", "2024/02/25"] },
  { title: "ベンチプレス", value: ["100kg", "95kg", "2024/03/31"] },
  { title: "スクワット", value: ["130kg", "110kg", "2024/03/31"] },
  { title: "デッドリフト", value: ["130kg", "110kg", "2024/03/31"] },
  { title: "日商簿記2級", value: ["合格", "未勉強", "2024/06/xx"] },
  { title: "体重", value: ["65kg未満", "63.6kg", "2044/09/23"] },
  { title: "体脂肪率", value: ["15%未満", "17.6%", "2044/09/23"] },
];

const Objective = () => {
  return (
    <section>
      <SectionHeading className="px-2 py-4">目標</SectionHeading>
      <div className="px-2">
        <p className="font-20-24 mb-2 font-serif">会計が分かるエンジニアになる。</p>
        <p className="font-20-24 mb-2 font-serif">健康的で強い体でいる。</p>
      </div>
      <div className="overflow-x-auto border dark:border-gray-700">
        <div>
          <div className="flex font-bold">
            {objectiveHeader.map((th, i) => (
              <div
                key={i}
                className={`h-auto min-w-[130px] bg-gray-200 p-2 text-center dark:bg-gray-700 md:basis-1/3 ${
                  i === 0 ? " sticky left-0 " : ""
                }`}
              >
                {th}
              </div>
            ))}
          </div>
          {objective.map((d) => (
            <div key={d.title} className="flex">
              <div className="sticky left-0 h-full min-w-[130px] bg-gray-100 px-2 py-4 text-center dark:bg-gray-600 md:basis-1/3">
                {d.title}
              </div>
              {d.value.map((v, j) => (
                <div
                  key={j}
                  className={`flex min-w-[130px] items-center justify-center text-center md:basis-1/3 ${
                    j === 0 ? "font-bold text-yellow-500" : ""
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="text-right">
        <p className="py-2">2023/08/15時点</p>
      </div>
    </section>
  );
};

export default Objective;
