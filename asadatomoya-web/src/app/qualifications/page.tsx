import WebGl from "@glsl/WebGl";

export default function Qualifications() {
  return (
    <div className="">
      <p>qualifications</p>
      <WebGl webgl="particles" texture={["/img/sample/tree.jpg", "/img/profile.jpg"]} />
      <div className="min-h-screen"></div>
      <WebGl
        webgl="particles"
        texture={["/img/sample/tree.jpg", "/img/sample/sea.jpg", "/img/sample/dog.jpg"]}
      />
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
}
