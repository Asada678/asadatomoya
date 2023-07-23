import { ExternalLink } from "lucide-react";

import WebGl from "@/glsl/WebGl";

const Hero = () => {
  return (
    <section className="relative  h-screen max-h-[800px]">
      <div className="absolute left-1/2 top-0 h-full w-full max-w-screen-2xl -translate-x-1/2 lg:px-0">
        <div className="absolute left-0 top-1/4 w-full max-w-2xl px-3 sm:pl-8">
          <h1 className="font-48-90 font-black drop-shadow-2xl dark:text-gray-200">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-400 bg-clip-text text-transparent">
              浅田智哉
            </span>
          </h1>
          <p className="font-serif-jp font-16-20 mt-2 leading-relaxed text-gray-100">
            筋トレ・プログラミング・ラグビーが
            <br className="block sm:hidden" />
            好きなWebエンジニアです。
          </p>

          <div className="flex flex-col justify-end">
            <p className="font-serif-jp font-12-14 mt-8 text-gray-100">
              このサイトのソースコードはこちら
            </p>
            <a
              href="https://github.com/Asada678/asadatomoya"
              target="_blank"
              className="group mt-2 flex w-56 items-center justify-center rounded-3xl bg-orange-200 py-3 text-gray-900 transition-colors duration-300 hover:bg-orange-300"
            >
              GitHub
              <ExternalLink className="ml-2 h-4 w-4 duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <WebGl
          webgl="particles"
          texture={["/img/hero.jpg"]}
          className="absolute left-0 top-0 -z-10 h-full w-full scale-x-[-1] transform"
          aspectVideo={false}
        />
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black bg-opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;
