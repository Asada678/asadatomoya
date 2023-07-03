import WebGl from "@glsl/WebGl";

export default function Cylinder() {
  return (
    <div className="">
      <p>cylinder</p>
      <div className="flex h-screen items-center justify-center">
        <WebGl
          webgl="cylinder"
          texture={[
            // "/img/profile.jpg",
            "/img/sample/sea.jpg",
            "/img/sample/dog.jpg",
            "/img/sample/sea.jpg",
          ]}
          className="h-screen1/2 grow"
        />
      </div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
}
