import WebGl from "@glsl/WebGl";

export default function Qualifications() {
  return (
    <div className="">
      <p>qualifications</p>
      <div className="h-screen">
        <div className="py-32"></div>
        <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
          <WebGl
            webgl="slider-world"
            texture={["/img/sample/sea.jpg", "/img/sample/dog.jpg", "/img/sample/sea.jpg"]}
            className="aspect-video w-full"
          />
        </div>
      </div>
      <div className="relative min-h-screen">
        <WebGl
          webgl="particles"
          texture={["/img/sample/sea.jpg", "/img/sample/dog.jpg"]}
          className="absolute aspect-square w-full"
        />
      </div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
}
