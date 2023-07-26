"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ArrowBigLeftDash } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const router = useRouter();
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:mb-6">ブログタイトル</h1>

        <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">執筆中...</p>

        <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
          <Image
            width={500}
            height={300}
            className="h-full w-full object-contain"
            src={"/img/profile2.jpg"}
            alt="blog content image"
          />
        </div>

        <div>
          <button
            onClick={() => router.push("/blog")}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
          >
            <ArrowBigLeftDash />
            一覧へ戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
