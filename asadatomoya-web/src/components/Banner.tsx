"use client";
import { useState } from "react";

import { ExternalLink, X } from "lucide-react";

const Banner = () => {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex w-full bg-indigo-500 bg-opacity-90 py-4 shadow sm:py-6">
      <div className="mx-auto flex justify-center gap-2 px-4 sm:max-w-lg sm:gap-4">
        <div className="flex flex-col gap-2">
          <div className="mb-2 text-gray-100">このページはNotEqualを参考に作成したものです。</div>
          <a
            href="https://sample.not-equal.dev"
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-center font-semibold text-gray-100 outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 sm:w-auto"
          >
            Not Equalへ
            <ExternalLink className="h-4 w-4 text-white sm:h-6 sm:w-6" />
          </a>
        </div>

        <div className="flex items-start justify-center sm:items-center">
          <button
            onClick={() => setShow(false)}
            type="button"
            className="rounded-full p-4 transition-colors duration-200 hover:bg-white hover:bg-opacity-10"
          >
            <X className="h-4 w-4 text-white sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
