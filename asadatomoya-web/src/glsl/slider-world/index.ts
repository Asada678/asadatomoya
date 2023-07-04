import gsap from "gsap";
import GUI from "lil-gui";
import {
  CylinderGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  ShaderMaterial,
  Vector3,
  VideoTexture,
} from "three";

import { Viewport } from "@model";
import { INode, lerp, pointTo } from "@utils";

import { Ob, Uniforms } from "@glsl/Ob";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Ob<Mesh<CylinderGeometry, MeshBasicMaterial>> {
  radius!: number;
  rotateAxis!: Vector3;
  activeSlideIdx!: number;
  diffRad!: number;
  slides!: Mesh[];
  playingVideo: any;
  playInterval!: NodeJS.Timer;
  beforeCreateMesh() {
    //TODO 画像が取れてこなかった時の場合に備えて必要、後でアンコメント
    // this.textures.forEach((tex) => tex === null && this.textures.delete(key));
    this.radius = this.rect.width;
    this.rotateAxis = new Vector3(0.2, 0.8, 0.2).normalize();
    this.activeSlideIdx = 0;
    this.diffRad = 0;
  }
  setupGeometry() {
    return new PlaneGeometry(this.rect.width, this.rect.height, 50, 1);
  }
  setupUniforms() {
    const uniforms = super.setupUniforms();
    uniforms.uDist = { value: 0.8 };
    uniforms.uRadius = { value: this.radius };
    uniforms.uSlideIdx = { value: 0 };
    uniforms.uSlideTotal = { value: this.textures.length };
    uniforms.uActiveSlideIdx = { value: this.activeSlideIdx };
    return uniforms;
  }
  setupTexes(uniforms: Uniforms) {
    return uniforms;
  }
  setupMesh() {
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
    cylinder.position.z = -this.radius;

    const { position, normal } = cylinderGeo.attributes;
    const ONE_LOOP = cylinderGeo.attributes.position.count / 2; // 頂点の個数 / 2
    const step = Math.floor(ONE_LOOP / this.textures.length); // 頂点をテクスチャの数で割った整数値

    let idx = 0;
    this.textures.forEach((tex) => {
      const planeMate = this.material.clone();
      planeMate.side = DoubleSide;
      planeMate.uniforms.tex1 = { value: tex };
      planeMate.uniforms.uSlideIdx.value = idx;
      planeMate.uniforms.uActiveSlideIdx = this.uniforms.uActiveSlideIdx;
      planeMate.uniforms.uTick = this.uniforms.uTick;
      planeMate.uniforms.uDist = this.uniforms.uDist;

      const planeGeo = this.geometry;
      const plane = new Mesh(planeGeo, planeMate);

      const pickedIdx = idx * step;
      plane.position.x = position.getX(pickedIdx);
      plane.position.z = position.getZ(pickedIdx);

      const originalDir = { x: 0, y: 0, z: 1 }; // Z方向に対して正面を向いている状態
      const targetDir = {
        // 画像が存在する頂点に対する法線のベクトル
        x: normal.getX(pickedIdx),
        y: 0,
        z: normal.getZ(pickedIdx),
      };
      pointTo(plane, originalDir, targetDir);
      cylinder.add(plane);

      idx++;
    });

    this.slides = [...cylinder.children] as Mesh[];

    // cylinder.up: Vector3 {x: 0, y: 1, z: 0}（シリンダーの上方向の向き）
    // rotateAxisの方向に回転
    pointTo(cylinder, cylinder.up, this.rotateAxis);

    return cylinder;
  }

  override async resize(viewport: Viewport, duration = 1) {
    this.resizing = true;

    const {
      $: { el },
      mesh: cylinder,
      originalRect,
    } = this;

    this.setupResolution(this.uniforms);

    const nextRect = INode.getRect(el);
    const { x, y } = this.getWorldPosition(nextRect, viewport);

    const p1 = new Promise((onComplete) => {
      gsap.to(cylinder.position, {
        x,
        y,
        overwrite: true,
        duration,
        onComplete,
      });
    });

    // 大きさの変更
    const { position, normal } = cylinder.geometry.attributes;
    const ONE_LOOP = cylinder.geometry.attributes.position.count / 2;
    const step = Math.floor(ONE_LOOP / this.textures.length);
    const p2 = new Promise((onComplete) => {
      gsap.to(this.scale, {
        width: nextRect.width / originalRect.width,
        height: nextRect.height / originalRect.height,
        depth: 1,
        overwrite: true,
        duration,
        onUpdate: () => {
          cylinder.scale.set(this.scale.width, this.scale.height, this.scale.width);

          let idx = 0;
          this.slides.forEach((plane) => {
            const pickIdx = idx * step;
            plane.position.x = position.getX(pickIdx);
            plane.position.z = position.getZ(pickIdx);

            const originalDir = { x: 0, y: 0, z: 1 };
            const targetDir = {
              x: normal.getX(pickIdx),
              y: 0,
              z: normal.getZ(pickIdx),
            };

            pointTo(plane, originalDir, targetDir);

            idx++;
          });

          this.radius = nextRect.width;
          cylinder.position.z = -this.radius;
        },
        onComplete,
      });
    });

    await Promise.all([p1, p2]);

    this.rect = nextRect;

    this.resizing = false;
  }
  setupVertex() {
    return vertexShader;
  }
  setupFragment() {
    return fragmentShader;
  }
  goTo(idx: number) {
    this.diffRad -= ((idx - this.activeSlideIdx) / this.slides.length) * 2 * Math.PI;
    this.activeSlideIdx = idx;
    // this.playVideo(idx);
  }
  render(tick: number) {
    super.render(tick);

    if (this.diffRad === 0) return;

    const rad = lerp(this.diffRad, 0, 0.95, 0.0001) || this.diffRad;
    this.mesh.rotateOnWorldAxis(this.rotateAxis, rad);
    this.diffRad -= rad;

    const uActiveSlideIdx = this.uniforms.uActiveSlideIdx.value as number;
    const idx = lerp(uActiveSlideIdx, this.activeSlideIdx, 0.05, 0.005);

    this.uniforms.uActiveSlideIdx.value = idx;
  }
  playVideo(idx: number) {
    const i = idx % this.slides.length;
    const slide = this.slides.at(i);
    const slideShaderMaterial = slide?.material as ShaderMaterial;
    const tex1Value = slideShaderMaterial.uniforms.tex1.value;
    this.playingVideo?.pause();
    if (tex1Value instanceof VideoTexture) {
      this.playInterval = setInterval(() => {
        if (this.uniforms.uActiveSlideIdx.value === idx) {
          this.playingVideo = tex1Value.source.data;
          this.playingVideo.play?.();
          clearInterval(this.playInterval);
        }
      }, 200);
    }
  }
  afterInit() {
    this.textures.forEach((tex) => {
      tex?.source.data.pause?.();
    });
    this.goTo(this.activeSlideIdx);
  }
  debug(folder: GUI) {
    const changeRotateAxis = () => {
      pointTo(this.mesh, this.mesh.up, this.rotateAxis.normalize());
    };
    folder.add(this.uniforms.uDist, "value", 0, 1, 0.01).name("uDist").listen();
    folder
      .add(this.rotateAxis, "x", -1, 1, 0.01)
      .name("rotation.x")
      .listen()
      .onChange(changeRotateAxis);
    folder
      .add(this.rotateAxis, "y", -1, 1, 0.01)
      .name("rotation.y")
      .listen()
      .onChange(changeRotateAxis);

    folder
      .add(this.rotateAxis, "z", -1, 1, 0.01)
      .name("rotation.z")
      .listen()
      .onChange(changeRotateAxis);

    const sliderIdx = { value: 0 };
    folder
      .add(sliderIdx, "value", 0, 12, 1)
      .name("goTo")
      .listen()
      .onChange(() => {
        this.goTo(sliderIdx.value);
      });
  }
}
