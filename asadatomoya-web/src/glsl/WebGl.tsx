"use client";
import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { LinearFilter, Texture, TextureLoader } from "three";

import { createArray, removeDuplicateArray } from "@utils";

import { useViewport } from "@context/ViewportContext";
import { useWorld } from "@context/WorldContext";

interface WebGlProps extends HTMLAttributes<HTMLDivElement> {
  texture: string | string[];
  webgl: "slider-world" | "particles" | "cylinder";
}

export interface WebGlHandle {
  nextSlide: () => void;
  prevSlide: () => void;
}

const WebGl = forwardRef<WebGlHandle, WebGlProps>(
  ({ texture, webgl, style = {}, className = "" }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const { ready, addOb, removeOb } = useWorld();
    const { viewport } = useViewport();
    const [ob, setOb] = useState<any>(null); // TODO anyで逃げ
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
        setOb(ob);
        obId = ob.id;
      };
      createOb();

      return () => {
        removeOb(obId);
      };
    }, [ready]); // worldの作成が完了していたら実行

    const prevSlide = useCallback(() => {
      if (!ob || ob.activeSlideIdx == null || !ob.goTo) return;
      const nextIdx = ob.activeSlideIdx - 1;
      ob.goTo(nextIdx);
    }, [ob]);
    const nextSlide = useCallback(() => {
      if (!ob || ob.activeSlideIdx == null || !ob.goTo) return;
      const nextIdx = ob.activeSlideIdx + 1;
      ob.goTo(nextIdx);
    }, [ob]);

    useImperativeHandle(ref, () => ({
      prevSlide,
      nextSlide,
    }));

    return <div className={`relative ${className}`} style={style} ref={divRef}></div>;
  },
);

WebGl.displayName = "WebGl";
export default WebGl;
