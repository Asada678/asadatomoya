import { CylinderGeometry, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";

import { pointTo } from "@utils";

import { Ob, Uniforms } from "@glsl/Ob";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Ob<Mesh<CylinderGeometry, MeshBasicMaterial>> {
  radius!: number;
  rotateAxis!: Vector3;
  beforeCreateMesh(): void {
    this.radius = this.rect.width;
    this.rotateAxis = new Vector3(0.2, 0.8, 0.2).normalize();
  }
  setupUniforms(): Uniforms {
    const uniforms = super.setupUniforms();
    uniforms.uRadius = { value: this.radius };
    return uniforms;
  }
  setupGeometry() {
    return new PlaneGeometry(this.rect.width, this.rect.height, 50, 1); // 曲面に貼り付けるためにXセグメントを50として設定
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
      opacity: 1,
      alphaTest: 0.5,
      wireframe: true,
      color: 0xff0000,
    });
    const cylinder = new Mesh(cylinderGeo, cylinderMate);
    cylinder.position.z = -this.radius;

    const { position, normal } = cylinderGeo.attributes;
    const ONE_LOOP = cylinderGeo.attributes.position.count; // 頂点の個数
    const step = Math.floor(ONE_LOOP / this.textures.length); // 頂点をテクスチャの数で割った整数値

    let idx = 0;
    this.textures.forEach((texture) => {
      const planeMate = this.material.clone();
      planeMate.uniforms.tex1 = { value: texture };
      const planeGeo = this.geometry;
      const plane = new Mesh(planeGeo, planeMate);

      const pickedIdx = idx * step;
      plane.position.x = position.getX(pickedIdx);
      plane.position.z = position.getZ(pickedIdx);

      const originalDir = { x: 0, y: 0, z: 1 }; // Z方向に対して正面を向いている状態
      const targetDir = { x: normal.getX(pickedIdx), y: 0, z: normal.getZ(pickedIdx) }; // 画像が存在する頂点に対する法線のベクトル
      pointTo(plane, originalDir, targetDir);

      cylinder.add(plane);

      idx++;
    });
    // cylinder.up: Vector3 {x: 0, y: 1, z: 0}（シリンダーの上方向の向き）
    // rotateAxisの方向に回転
    pointTo(cylinder, cylinder.up, this.rotateAxis);
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
