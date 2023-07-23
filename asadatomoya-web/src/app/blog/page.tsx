import { ArticleType } from "asadatomoya-common/models";

import Article from "@/components/Article";

function getRandomDate(from: Date, to: Date) {
  return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}

const articles: (ArticleType & { regDate: Date })[] = [
  {
    author: "Asada",
    content:
      "これはAsadaの記事です。非常に面白い内容を含んでいます。これはAsadaの記事です。非常に面白い内容を含んでいます。これはAsadaの記事です。非常に面白い内容を含んでいます。これはAsadaの記事です。非常に面白い内容を含んでいます。これはAsadaの記事です。非常に面白い内容を含んでいます。これはAsadaの記事です。非常に面白い内容を含んでいます。これはAsadaの記事です。非常に面白い内容を含んでいます。",
    image: "https://example.com/image1.jpg",
    regDate: getRandomDate(new Date(2020, 1, 1), new Date()),
    title: "Asadaの素晴らしい記事",
  },
  {
    author: "Tomoya",
    content: "これはTomoyaの記事です。新しいテクノロジーについて述べています。",
    image: "https://example.com/image2.jpg",
    regDate: getRandomDate(new Date(2020, 1, 1), new Date()),
    title: "新世代テクノロジーについて",
  },
  {
    author: "Jane Jackobs",
    content: "Jane Jackobsによる洞察に満ちた記事です。",
    image: "https://example.com/image3.jpg",
    regDate: getRandomDate(new Date(2020, 1, 1), new Date()),
    title: "深遠なる洞察",
  },
  {
    author: "Tylor Grey",
    content: "Tylor Greyによるエキサイティングな記事です。",
    image: "https://example.com/image4.jpg",
    regDate: getRandomDate(new Date(2020, 1, 1), new Date()),
    title: "エキサイティングな冒険",
  },
  {
    author: "Ann Park",
    content: "Ann Parkによる詩的な記事です。",
    image: "https://example.com/image5.jpg",
    regDate: getRandomDate(new Date(2020, 1, 1), new Date()),
    title: "詩的な世界",
  },
];

export default function Page() {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">Blog</h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            This is a section of some simple filler text, also known as placeholder text. It shares
            some characteristics of a real written text but is random or otherwise generated.
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
