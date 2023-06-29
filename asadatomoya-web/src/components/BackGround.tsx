import { type FC } from "react";

interface BackGroundProps {}

const BackGround: FC<BackGroundProps> = ({}) => {
  return (
    <div className="bg-white-gradient dark:bg-black-gradient fixed left-0 top-0 -z-10 flex h-screen w-screen"></div>
  );
};

export default BackGround;
