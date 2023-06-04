import { type FC } from "react";

interface MainHeadingProps {}

const MainHeading: FC<MainHeadingProps> = ({}) => {
  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black">
      {`浅田智哉's `}
      <br className="block sm:hidden" />
      Portfolio Site
    </h1>
  );
};

export default MainHeading;
