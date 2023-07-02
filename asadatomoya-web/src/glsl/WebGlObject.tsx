"use client";
import { type FC, useEffect, useRef } from "react";

import { LinearFilter, Texture, TextureLoader } from "three";

import { removeDuplicateArray } from "@utils";

import { useWorld } from "@context/WorldContext";

import { Ob } from "./Ob";

interface WebGlObjectProps {
  textureUrls: string[];
  type: "particles" | "something";
}

const WebGlObject: FC<WebGlObjectProps> = ({ textureUrls, type }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { ready, addObject } = useWorld();
  useEffect(() => {
    if (!ready) return;
    const div = divRef.current;
    console.log("div:", div);
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
      console.log("textures:", textures);
      const o = new Ob({
        textures,
        el: div,
        type,
      });
      console.log("o:", o);
      addObject(o.mesh);
    };
    loadTextures(textureUrls);

    return () => {};
  }, [ready]);

  return <div className="h-16 w-16 bg-blue-600" ref={divRef}></div>;
};

export default WebGlObject;
