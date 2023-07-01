import { type FC } from "react";

interface BackgroundProps {}

const Background: FC<BackgroundProps> = ({}) => {
  return (
    <div className="bg-white-gradient dark:bg-black-gradient fixed left-0 top-0 -z-50 flex h-screen w-screen"></div>
  );
};

export default Background;
