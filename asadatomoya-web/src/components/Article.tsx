import { type FC } from "react";

import Link from "next/link";

import { ArticleType } from "asadatomoya-common/models";
import { formatTimeToNow } from "asadatomoya-common/utils";

interface ArticleProps {
  article: ArticleType & { regDate: Date };
}

const Article: FC<ArticleProps> = ({ article }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border">
      <Link href={`/blog/${article.title}`} className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
        <img
          src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600"
          loading="lazy"
          alt="Photo by Minh Pham"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          <a
            href="#"
            className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
          >
            {article.title}
          </a>
        </h2>

        <p className="mb-8 text-gray-500">{article.content}</p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1611898872015-0571a9e38375?auto=format&q=75&fit=crop&w=64"
                loading="lazy"
                alt="Photo by Brock Wegner"
                className="h-full w-full object-cover object-center"
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
