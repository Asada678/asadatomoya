"use client";
import { type FC, HTMLAttributes, useEffect, useRef } from "react";

import { LinearFilter, Texture, TextureLoader } from "three";

import { createArray, removeDuplicateArray } from "@utils";

import { useViewport } from "@context/ViewportContext";
import { useWorld } from "@context/WorldContext";

interface WebGlProps extends HTMLAttributes<HTMLDivElement> {
  texture: string | string[];
  webgl: "slider-world" | "particles" | "cylinder";
}

const WebGl: FC<WebGlProps> = ({ texture, webgl, style = {}, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { ready, addOb, removeOb } = useWorld();
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
        return new Ob({ textures, el: div, viewport, webgl });
      });
      addOb(ob);
      obId = ob.id;
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
