"use client";
import { type FC, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { LinearFilter, PlaneGeometry, Points, Texture, TextureLoader, Vector3 } from "three";

import { isSafari, isTouchDevices, removeDuplicateArray } from "@utils";

import { useViewport } from "@context/ViewportContext";
import { useWorld } from "@context/WorldContext";
import { BaseUniforms, Ob } from "@glsl/Ob";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

class P extends Ob {
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
  setupTexes(uniforms: BaseUniforms) {
    uniforms.texCurrent = { value: this.textures[0] };
    uniforms.texNext = { value: null };
    return uniforms;
  }

  running = false;
  goTo(idx: number, duration = 3) {
    const _idx = (((idx % this.textures.length) + this.textures.length) % this.textures.length) + 1;

    if (this.running) return;
    this.running = true;

    const nextTex = this.textures[_idx - 1];
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
        const activeEl = this.getChildMediaEl(_idx - 1);
        activeEl.style.opacity = "1";
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
      mediaEl.classList.add("particle-child");
      this.$.el.parentElement?.append(mediaEl);
      this.childMediaEls.push(mediaEl);
      mediaEl.addEventListener("click", () => {
        mediaEl.play?.();
      });
    });
    this.goTo(0, 0.1);
  }
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

interface ParticlesProps {
  textureUrls: string[];
}

const Particles: FC<ParticlesProps> = ({ textureUrls }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { ready, addOb } = useWorld();
  const { viewport } = useViewport();
  //TODO textureCache
  useEffect(() => {
    if (!ready) return;
    if (!(viewport.width > 0)) return;
    const div = divRef.current;
    if (!div) return;
    const loadTextures = async (textureUrls: string[]) => {
      const newArray = removeDuplicateArray(textureUrls);
      const loadImg = async (url: string) => {
        try {
          const textureLoader = new TextureLoader();
          const tex = await textureLoader.loadAsync(url);
          tex.magFilter = LinearFilter;
          tex.minFilter = LinearFilter;
          tex.needsUpdate = false;
          return tex;
        } catch (e) {
          throw new Error();
        } finally {
        }
      };
      const texturePromises: Promise<Texture | void>[] = [];
      newArray.forEach((url) => {
        const promise: Promise<Texture | void> = loadImg(url)
          .then((tex) => {
            return tex;
          })
          .catch((error) => {
            console.log("error:", error);
          });
        texturePromises.push(promise);
      });
      const textures = (await Promise.all(texturePromises)).filter(
        (texture): texture is Texture => texture !== undefined,
      );
      const o = new P({
        textures,
        el: div,
        viewport,
      });
      addOb(o);
    };
    loadTextures(textureUrls);

    return () => {};
  }, [ready]);

  return (
    <>
      <h2 className="mb-16 text-xl font-bold">Particles</h2>
      <div className="" style={{ height: 500 }} ref={divRef}></div>
    </>
  );
};

export default Particles;
