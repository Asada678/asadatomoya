import { debug } from "console";

import gsap from "gsap";
import { folder } from "leva";
import GUI from "lil-gui";
import { Mesh, Object3D } from "three";

import { Ob } from "@/glsl/Ob";
import { isTouchDevices } from "@/utils";

import frag from "./fragment.glsl";
import vert from "./vertex.glsl";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Ob<Mesh> {
  setupMaterial() {
    const material = super.setupMaterial();
    material.precision = isTouchDevices ? "highp" : "lowp";
    return material;
  }

  setupUniforms() {
    const uniforms = super.setupUniforms();
    // uniforms.uLoop = { value: 15 }; // 2023/5/5 WebGL1.0対応 uLoopはシェーダ内で定数で定義に変更
    uniforms.uProgress = { value: 1 };
    uniforms.uDPR = { value: 1 };
    return uniforms;
  }

  setupFragment() {
    return frag;
  }
  setupVertex() {
    return vert;
  }

  afterInit() {}

  debug(folder: GUI) {
    folder.add(this.uniforms.uProgress, "value", 0, 1, 0.1).name("progress").listen();
    const datObj = { next: !!this.uniforms.uProgress.value };
    folder
      .add(datObj, "next")
      .name("Animate")
      .onChange(() => {
        gsap.to(this.uniforms.uProgress, {
          value: +datObj.next,
          duration: 1.0,
          ease: "power4.inOut",
        });
      });
  }
}
