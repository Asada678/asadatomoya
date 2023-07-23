import SectionHeading from "@/components/SectionHeading";

const qualification = [
  { yyyyMM: "2014/08", value: "第一種普通自動車運転免許" },
  { yyyyMM: "2019/05", value: "基本情報技術者" },
  { yyyyMM: "2019/06", value: "TOEIC L/R 865点" },
  { yyyyMM: "2019/12", value: "応用情報技術者" },
  { yyyyMM: "2022/01", value: "LinuCレベル1" },
  { yyyyMM: "2022/09", value: "ORACLE MASTER Silver DBA 2019" },
  { yyyyMM: "2023/02", value: "JSTQB Foundation Level" },
];

const Qualification = () => {
  return (
    <section>
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
    </section>
  );
};

export default Qualification;
