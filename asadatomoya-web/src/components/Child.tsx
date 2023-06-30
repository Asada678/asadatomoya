import { type FC, useCallback, useEffect } from "react";

import { useViewport } from "@context/ViewportContext";

const Child: FC = ({}) => {
  const { viewport, addResizeAction, removeResizeAction } = useViewport();
  const action = useCallback(() => {
    console.log("added action");
  }, []);

  useEffect(() => {
    addResizeAction(action);

    return () => {
      removeResizeAction(action);
    };
  }, [addResizeAction, removeResizeAction, action]);

  const handleClick = () => {
    addResizeAction(action);
  };

  return (
    <div>
      <div>{viewport.width}</div>
      <div>{viewport.height}</div>
      <button onClick={handleClick}>child button</button>
    </div>
  );
};

export default Child;
