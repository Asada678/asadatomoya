import { CylinderGeometry, Mesh, MeshBasicMaterial } from "three";

import { Ob, Uniforms } from "@glsl/Ob";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Ob<Mesh<CylinderGeometry, MeshBasicMaterial>> {
  radius!: number;
  beforeCreateMesh(): void {
    this.radius = this.rect.width;
  }
  setupMesh(): Mesh<CylinderGeometry, MeshBasicMaterial> {
    const cylinderGeo = new CylinderGeometry(
      this.radius,
      this.radius,
      this.rect.height,
      100,
      1,
      true,
    );
    const cylinderMate = new MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      alphaTest: 0.5,
    });
    const cylinder = new Mesh(cylinderGeo, cylinderMate);
    console.log('cylinder:', cylinder);
    return cylinder;
  }
  setupVertex() {
    return vertexShader;
  }
  setupFragment() {
    return fragmentShader;
  }
  afterInit() {}
}
