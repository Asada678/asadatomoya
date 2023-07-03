import { gsap } from "gsap";
import { PlaneGeometry, Points, ShaderMaterial, Vector3 } from "three";

import { isSafari, isTouchDevices } from "@utils";

import { Ob, Uniforms } from "@glsl/Ob";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Ob<Points<PlaneGeometry, ShaderMaterial>> {
  activeSlideIdx: number = 0;
  childMediaEls: HTMLElement[] = [];
  beforeCreateMesh() {}
  setupGeometry() {
    const width = this.rect.width,
      height = this.rect.height,
      wSeg = width / 4,
      hSeg = height / 4;

    const plane = new PlaneGeometry(width, height, wSeg, hSeg);
    return plane;
  }
  setupUniforms() {
    const uniforms = super.setupUniforms();
    uniforms.uPointSize = { value: isTouchDevices ? 2 : 3 };
    uniforms.uSpeed = { value: 0.05 };
    uniforms.uCnoise = { value: new Vector3(0.005, 0, 0.01) };
    uniforms.uExpand = { value: new Vector3(1, 1, 1) };
    return uniforms;
  }
  setupMesh() {
    return new Points(this.geometry, this.material);
  }
  setupVertex() {
    return vertexShader;
  }
  setupFragment() {
    return fragmentShader;
  }
  setupTexes(uniforms: Uniforms) {
    uniforms.texCurrent = { value: this.textures[0] };
    uniforms.texNext = { value: null };
    return uniforms;
  }

  running = false;
  goTo(idx: number, duration = 3) {
    const _idx = (((idx % this.textures.length) + this.textures.length) % this.textures.length) + 1;

    if (this.running) return;
    this.running = true;

    const nextTex = this.textures[_idx];
    this.uniforms.texNext.value = nextTex;

    gsap.to(this.uniforms.uProgress, {
      value: 1,
      duration,
      ease: "none",
      onStart: () => {
        this.childMediaEls.forEach((el) => {
          el.style.opacity = "0";
          if (el instanceof HTMLVideoElement) {
            el.pause?.();
          }
        });
        this.mesh.visible = true;
      },
      onComplete: () => {
        this.uniforms.texCurrent.value = this.uniforms.texNext.value;
        this.uniforms.uProgress.value = 0;
        const activeEl = this.getChildMediaEl(_idx);
        const change = {
          opacity: 1,
          duration: 0.7,
          ease: "slow",
        };
        gsap.to(activeEl, change);
        gsap.to(this.$.el, change);
        this.mesh.visible = false;
        this.running = false;
        this.activeSlideIdx = idx;
        if (activeEl instanceof HTMLVideoElement && (activeEl.paused || isSafari)) {
          activeEl.play?.();
        }
      },
    });
  }
  getChildMediaEl(idx: number) {
    return this.childMediaEls[idx % this.textures.length];
  }
  async afterInit() {
    this.textures.forEach((tex) => {
      const mediaEl = tex.source.data.cloneNode();
      mediaEl.classList.add(
        "absolute",
        "top-0",
        "left-0",
        "w-full",
        "h-full",
        "object-cover",
        "m-0",
      );
      this.$.el.append(mediaEl);
      this.childMediaEls.push(mediaEl);
      mediaEl.addEventListener("click", () => {
        mediaEl.play?.();
      });
    });
    this.goTo(0);
  }
  // TODO
  // debug(folder) {
  //   // folder.open();

  //   folder.add(this.uniforms.uSpeed, "value", 0, 0.1, 0.001).name("uSpeed").listen();

  //   folder.add(this.uniforms.uCnoise.value, "x", 0, 0.01, 0.001).name("cnoise.x").listen();
  //   folder.add(this.uniforms.uCnoise.value, "y", 0, 0.01, 0.001).name("cnoise.y").listen();
  //   folder.add(this.uniforms.uCnoise.value, "z", 0, 0.01, 0.001).name("cnoise.z").listen();

  //   folder.add(this.uniforms.uExpand.value, "x", 0, 10, 0.1).name("expand.x").listen();
  //   folder.add(this.uniforms.uExpand.value, "y", 0, 10, 0.1).name("expand.y").listen();
  //   folder.add(this.uniforms.uExpand.value, "z", 0, 10, 0.1).name("expand.z").listen();

  //   folder.add(this.uniforms.uProgress, "value", 0, 1, 0.1).name("progress").listen();
  //   const sliderIdx = { value: 0 };
  //   folder
  //     .add(sliderIdx, "value", -12, 12, 1)
  //     .name("goTo")
  //     .listen()
  //     .onChange(() => {
  //       this.goTo(sliderIdx.value);
  //     });
  // }
}
