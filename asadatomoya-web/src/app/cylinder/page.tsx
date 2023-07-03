import WebGl from "@glsl/WebGl";

export default function Cylinder() {
  return (
    <div className="">
      <p>cylinder</p>
      <div className="h-screen">
        <div className="py-32"></div>
        <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
          <WebGl
            webgl="cylinder"
            texture={[
              // "/img/profile.jpg",
              "/img/sample/sea.jpg",
              "/img/sample/dog.jpg",
              "/img/sample/sea.jpg",
            ]}
            className="aspect-video w-full bg-white"
          />
          <h3>webgl cylinder</h3>
        </div>
      </div>
    </div>
  );
}
