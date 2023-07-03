"use client";
import { type FC, HTMLAttributes, useEffect, useRef } from "react";

import { AxesHelper, LinearFilter, Texture, TextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { config, createArray, gui, INode, removeDuplicateArray } from "@utils";

import { useViewport } from "@context/ViewportContext";
import { useWorld } from "@context/WorldContext";

interface WebGlProps extends HTMLAttributes<HTMLDivElement> {
  texture: string | string[];
  webgl: "slider-world" | "particles" | "cylinder";
}

const WebGl: FC<WebGlProps> = ({ texture, webgl, style = {}, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { world,ready, addOb, removeOb } = useWorld();
  const { viewport } = useViewport();
  //TODO textureCache

  useEffect(() => {
    if (!ready) return;
    if (!(viewport.width > 0)) return;
    const div = divRef.current;
    if (!div) return;

    let obId = ""; // アンマウント時にremoveObへと渡すid

    const createOb = async () => {
      const newArray = removeDuplicateArray(createArray(texture));
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
      const ob = await import(`./${webgl}/index`).then(({ default: Ob }) => {
        return new Ob({ textures, el: div, viewport });
      });
      addOb(ob);
      obId = ob.id;

      // gui.init();

      // // function addGUI(world) {
      // gui.add((gui) => {
      //   const isActive = { value: false };
      //   console.log("isActive:", isActive);

      //   let axesHelper = null;
      //   gui
      //     .add(isActive, "value")
      //     .name("OrbitControl")
      //     .onChange(() => {
      //       if (isActive.value) {
      //         axesHelper = new AxesHelper(1000);
      //         world.scene?.add(axesHelper);
      //         world.controls = new OrbitControls(world.camera, world.renderer?.domElement);
      //         world.renderer.domElement.style.zIndex = '1';
      //       } else {
      //         world.controls?.dispose();
      //         world.renderer.domElement.style.zIndex = '-1';
      //       }
      //     });
      // });
    };
    createOb();

    return () => {
      removeOb(obId);
    };
  }, [ready]); // worldの作成が完了していたら実行

  return <div className={`relative ${className}`} style={style} ref={divRef}></div>;
};

// lil-guiへの項目の追加

export default WebGl;
