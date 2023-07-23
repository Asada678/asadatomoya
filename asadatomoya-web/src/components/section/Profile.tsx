import SectionHeading from "../SectionHeading";

const profile = [
  { title: "氏名", value: "浅田 智哉" },
  { title: "生年月日", value: "1994/09/23" },
  { title: "性別", value: "男性" },
  { title: "職業", value: "エンジニア" },
  { title: "身長/体重/体脂肪率", value: "168cm/63kg/17%" },
  { title: "好きなスポーツ", value: "ラグビー、サッカー、野球" },
];

const Profile = () => {
  return (
    <section>
      <SectionHeading className="px-2 py-4">プロフィール</SectionHeading>
      <div className="max-w-3xl px-2">
        {profile.map((p, i) => (
          <div className="items-center gap-4 border-b pb-2 pt-4 md:flex md:py-8" key={i}>
            <h3 className="font-16-20 mb-1 w-36 md:w-48">{p.title}</h3>
            <p className="font-20-24 font-bold">{p.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
