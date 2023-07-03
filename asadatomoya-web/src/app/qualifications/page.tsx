import WebGl from "@glsl/WebGl";

export default function Qualifications() {
  return (
    <div className="">
      <p>qualifications</p>
      <div className="flex h-screen items-center justify-center">
        <WebGl
          webgl="slider-world"
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
      {/* <WebGl
        webgl="particles"
        texture={["/img/sample/tree.jpg", "/img/sample/sea.jpg", "/img/sample/dog.jpg"]}
      /> */}
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
}
