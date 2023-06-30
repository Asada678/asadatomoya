"use client";
import { type FC, useEffect, useRef, useState } from "react";

import { LinearFilter, Texture, TextureLoader } from "three";

interface ThreeLoaderProps {}

const ThreeLoader: FC<ThreeLoaderProps> = () => {
  const div = useRef<HTMLDivElement>(null);
  const [textures, setTextures] = useState<(Texture | void)[]>([]);
  const [loading, setLoading] = useState(true); // 追加

  useEffect(() => {
    let isUnmounted = false;

    const loadTextures = async () => {
      const data = div.current?.dataset;
      const map = new Map();
      for (let key in data) {
        if (!key.startsWith("tex")) continue;

        const url = data[key];
        if (!map.has(url)) {
          map.set(url, null);
        }
      }
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
      map.forEach((_, url) => {
        const promise: Promise<Texture | void> = loadImg(url)
          .then((tex) => {
            return tex;
          })
          .catch((error) => {
            console.log("error:", error);
          });
        texturePromises.push(promise);
      });
      const texes = await Promise.all(texturePromises);
      setTextures(texes);
      setLoading(false);
    };

    if (!isUnmounted) {
      loadTextures();
    }

    return () => {
      isUnmounted = true;
    };
  }, []);

  const handleClick = () => {
    console.log("textures :", textures);
  };

  return (
    <div>
      <div
        data-webgl="particles"
        data-tex-1="/img/sample/tree.jpg"
        data-tex-2="/img/sample/sea.jpg"
        data-tex-3="/img/sample/dog.jpg"
        data-scroll-trigger="progressParticles"
        ref={div}
      ></div>
      {loading && <button onClick={handleClick}>button loading true</button>}
      {!loading && <button onClick={handleClick}>button loading false</button>}
      <p>{textures.length}</p>
      {textures.map((tex, i) => (
        <div key={i}>
          <p>{i}</p>
          <img
            src={tex?.source.data.currentSrc}
            className="w-full object-contain"
            width={100}
            height={100}
            alt="texture"
          />
        </div>
      ))}
    </div>
  );
};

export default ThreeLoader;
