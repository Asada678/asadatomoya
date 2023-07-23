import WebGl from "@/glsl/WebGl";

const Hero = () => {
  return (
    <section className="relative  h-screen max-h-[800px]">
      <div className="absolute left-1/2 top-0 h-full w-full max-w-screen-2xl -translate-x-1/2">
        <div className="absolute left-0 top-1/4 w-full px-3">
          <h1 className="font-48-90 font-black drop-shadow-2xl dark:text-gray-200">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-400 bg-clip-text text-transparent">
              {`浅田智哉`}
            </span>
          </h1>
          <p className="font-serif-jp font-16-20 mt-2 leading-relaxed text-white">
            筋トレ・プログラミング・ラグビーが
            <br className="block sm:hidden" />
            好きなWebエンジニアです。
          </p>
        </div>
        <WebGl
          webgl="particles"
          texture={["/img/hero.jpg"]}
          className="absolute left-0 top-0 -z-10 h-full w-full transform scale-x-[-1]"
          aspectVideo={false}
        />
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black bg-opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;
