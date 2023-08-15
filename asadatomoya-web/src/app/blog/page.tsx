import { PencilLine } from "lucide-react";

import { ArticleType } from "asadatomoya-common/models";

import Article from "@/components/Article";

function getRandomDate(from: Date, to: Date) {
  return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

function generateRandomString(length: number): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const titles = [
  "おすすめ筋トレサプリメント",
  "Window→Macへの移行アプリ",
  "VSCode拡張機能",
  "Macショートカット変更",
  "Karabiner",
  "eslint import order",
  "tailwind order",
  "Next.js starter project",
  "snippet typescript",
  "Google日本語入力辞書ツール",
];

const articles: (ArticleType & { regDate: Date })[] = titles
  .map((title, i) => {
    return {
      title,
      slug: generateRandomString(10),
      author: "Asada Tomoya",
      content: "執筆中...",
      image: "/img/noImage.jpg",
      regDate: getRandomDate(new Date(2020, i, 1), new Date(2020, i, 28)),
    };
  })
  .sort((a, b) => a.regDate.getTime() - b.regDate.getTime());

export default function Page() {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Blog</h2>

          <p className="mx-auto flex max-w-screen-md items-center  justify-center gap-2 text-center text-gray-500 md:text-lg">
            <PencilLine className="inline-block h-4 w-4 text-blue-400 sm:h-10 sm:w-10" />
            このページは作成中です...
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {articles.map((article) => (
            <Article key={article.title} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
