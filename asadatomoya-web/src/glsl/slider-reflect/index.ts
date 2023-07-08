import GUI from "lil-gui";
import {
  DoubleSide,
  Group,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  VideoTexture,
} from "three";

import { lerp } from "@utils";

import { Ob } from "@glsl/Ob";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Ob<Group> {
  activeSlideIdx!: number;
  playingVideo!: HTMLVideoElement;
  playInterval!: NodeJS.Timer;
  beforeCreateMesh() {
    this.activeSlideIdx = 0;
  }
  setupGeometry() {
    return new PlaneGeometry(this.rect.width * this.textures.length, this.rect.height, 1, 1);
  }
  setupUniforms() {
    const uniforms = super.setupUniforms();
    uniforms.uIsReflect = { value: 0 };
    uniforms.uSlideIdx = { value: 0 };
    uniforms.uSlideTotal = { value: this.textures.length };
    uniforms.uActiveSlideIdx = { value: this.activeSlideIdx };
    return uniforms;
  }
  setupMesh() {
    const mesh = super.setupMesh() as Mesh<PlaneGeometry, ShaderMaterial>;
    const reflect = mesh.clone();
    reflect.material = reflect.material.clone();

    reflect.material.alphaTest = 0;
    reflect.material.uniforms.uIsReflect.value = 1;

    reflect.material.uniforms.uTick = this.uniforms.uTick;
    reflect.material.uniforms.uActiveSlideIdx = this.uniforms.uActiveSlideIdx;

    reflect.material.side = DoubleSide;
    reflect.rotation.x = Math.PI;
    const gap = 10;
    reflect.position.y -= this.rect.height + gap;
    const group = new Group();

    group.rotation.y = 0.4;

    group.add(mesh, reflect);

    return group;
  }
  setupVertex() {
    return vertexShader;
  }
  setupFragment() {
    return fragmentShader;
  }
  goTo(idx: number) {
    this.activeSlideIdx = idx;
    this.playVideo(idx);
  }
  render(tick: number) {
    super.render(tick);

    const uActiveSlideIdx = this.uniforms.uActiveSlideIdx.value as number;
    const idx = lerp(uActiveSlideIdx, this.activeSlideIdx, 0.1);

    this.uniforms.uActiveSlideIdx.value = idx;
  }
  playVideo(idx: number) {
    const offset = 2;
    const i = ((idx + offset) % this.textures.length) + 1;

    const texValue = this.uniforms["tex" + i].value;
    this.playingVideo?.pause();
    if (texValue instanceof VideoTexture) {
      this.playInterval = setInterval(() => {
        if (this.uniforms.uActiveSlideIdx.value === idx) {
          this.playingVideo = texValue.source.data;
          this.playingVideo.play?.();
          clearInterval(this.playInterval);
        }
      }, 200);
    }
  }
  afterInit() {
    setTimeout(() => {
      this.textures.forEach((tex) => {
        tex?.source.data.pause?.();
      });
      this.goTo(this.activeSlideIdx);
    }, 50);
  }
  debug(folder: GUI) {
    folder.add(this.mesh.rotation, "y", -Math.PI, Math.PI, 0.01).name("rotation.y");

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
