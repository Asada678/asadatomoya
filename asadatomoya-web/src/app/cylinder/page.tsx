import WebGl from "@glsl/WebGl";

export default function Cylinder() {
  return (
    <div className="">
      <p>cylinder</p>
      <div className="h-screen">
        <div className="py-32"></div>
        <div className="mx-auto flex w-full max-w-xl items-center justify-center">
          <WebGl
            webgl="cylinder"
            texture={[
              "/img/sample/tree.jpg",
              "/img/profile.jpg",
              "/img/sample/sea.jpg",
              "/img/sample/dog.jpg",
              "/img/logo/icon.webp",
            ]}
            className="aspect-video w-full"
          />
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </div>
  );
}
