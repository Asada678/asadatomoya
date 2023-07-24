import Link from "next/link";

import { Frown, Home } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <title>404 | asadatomoya.com</title>
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center text-center">
        <div className="h-full">
          <h1 className="font-24-36 font-passion !italic text-orange-500">Asada Tomoya</h1>

          <div className="mt-8 text-red-400">
            <Frown className="mx-auto h-12 w-12 sm:h-16 sm:w-16" />
            <p className="font-24-36 font-bold">404</p>
          </div>

          <div className="mt-8 text-gray-500">
            <p>申し訳ございません。</p>
            <p>お探しのページは見つかりませんでした。</p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-8 py-3 text-center font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700"
            >
              <Home className="h-4 w-4 sm:h-6 sm:w-6" />
              トップページへ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
