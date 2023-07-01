"use client";
import { type FC, useCallback, useEffect } from "react";

import { BoxGeometry, Mesh, MeshLambertMaterial } from "three";

import { useViewport } from "@context/ViewportContext";
import { useWorld } from "@context/WorldContext";

const Child: FC = ({}) => {
  const { viewport, addResizeAction, removeResizeAction } = useViewport();
  const { world, addWebGlObject } = useWorld();

  const action = useCallback(() => {
    console.log("added action");
  }, []);

  useEffect(() => {
    addResizeAction(action);

    return () => {
      removeResizeAction(action);
    };
  }, []);

  const handleClick = () => {
    console.log("world:", world);
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    addResizeAction(action);
    const size = getRandomInt(30, 300);
    const boxGeometry = new BoxGeometry(size, size, size);
    const boxMaterial = new MeshLambertMaterial({
      color: getRandomColor(),
    });
    const box = new Mesh(boxGeometry, boxMaterial);
    box.position.x = getRandomInt(-500, 500);
    box.position.y = getRandomInt(-500, 500);
    box.position.z = getRandomInt(-500, 500);
    box.rotation.set(getRandomInt(-45, 45), getRandomInt(-45, 45), getRandomInt(-45, 45));
    addWebGlObject(box);
  };

  const renderClick = () => {
    // render();
  };

  return (
    <div className="my-16 px-4">
      <button className="my-4 rounded bg-blue-400 px-8 py-4" onClick={handleClick}>
        add box
      </button>
      <div>viewport.width: {viewport.width}</div>
      <div>viewport.height: {viewport.height}</div>
    </div>
  );
};

export default Child;
