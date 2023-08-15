import { type FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { ArticleType } from "asadatomoya-common/models";
import { formatTimeToNow } from "asadatomoya-common/utils";

interface ArticleProps {
  article: ArticleType & { regDate: Date };
}

const Article: FC<ArticleProps> = ({ article }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border">
      <Link
        href={`/blog/${article.slug}`}
        className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
      >
        <Image
          className="object-cover object-center"
          fill
          src={article.image || "/img/noImage.jpg"}
          alt={article.title}
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          <Link
            href={`/blog/${article.slug}`}
            className="text-indigo-300 transition duration-500  hover:text-indigo-500 active:text-indigo-600"
          >
            {article.title}
          </Link>
        </h2>

        {/* TODO max-heightを設定する */}
        <p className="mb-8 text-gray-500">{article.content}</p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
              <Image
                width={60}
                height={60}
                className="h-full w-full object-cover object-center"
                src={"/img/profile.jpg"}
                alt="user icon"
              />
            </div>

            <div>
              <span className="block text-indigo-500">{article.author}</span>
              <span className="block text-sm text-gray-400">
                {formatTimeToNow(article.regDate)}
              </span>
            </div>
          </div>

          <span className="rounded border px-2 py-1 text-sm text-gray-500">Article</span>
        </div>
      </div>
    </div>
  );
};

export default Article;
