import Particles from "@glsl/particles/Particles";

export default function Qualifications() {
  return (
    <div className="">
      <p>qualifications</p>
      <Particles
        textureUrls={["/img/sample/tree.jpg", "/img/sample/sea.jpg", "/img/sample/dog.jpg"]}
        type="particles"
      />
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
}
