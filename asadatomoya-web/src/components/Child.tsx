"use client";
import { type FC, useCallback, useEffect } from "react";

import { useViewport } from "@context/ViewportContext";
import { useWorld } from "@context/WorldContext";

const Child: FC = ({}) => {
  const { viewport, addResizeAction, removeResizeAction } = useViewport();
  const world = useWorld();

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
    addResizeAction(action);
  };

  return (
    <div className="my-16 px-4">
      <div>{viewport.width}</div>
      <div>{viewport.height}</div>
      <button className="my-4 rounded bg-blue-400 px-4 py-2" onClick={handleClick}>
        child button
      </button>
    </div>
  );
};

export default Child;
