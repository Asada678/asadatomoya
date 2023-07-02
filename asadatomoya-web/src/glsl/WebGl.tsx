"use client";
import { type FC, useEffect, useRef } from "react";

import { LinearFilter, Texture, TextureLoader } from "three";

import { createArray, removeDuplicateArray } from "@utils";

import { useViewport } from "@context/ViewportContext";
import { useWorld } from "@context/WorldContext";

interface WebGlProps {
  texture: string | string[];
  webgl: "particles";
  height?: number | string;
}

const WebGl: FC<WebGlProps> = ({ texture, webgl, height = "50vh" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { ready, addOb } = useWorld();
  const { viewport } = useViewport();
  //TODO textureCache

  useEffect(() => {
    console.log("height:", height);
    if (!ready) return;
    if (!(viewport.width > 0)) return;
    const div = divRef.current;
    if (!div) return;

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
    };
    createOb();

    return () => {
      // TODO obをworldから削除
      console.log("unmounted component:");
    };
  }, [ready]);

  return (
    <>
      <div className="relative" style={{ height }} ref={divRef}></div>
    </>
  );
};

export default WebGl;
