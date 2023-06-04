import { type FC } from "react";

interface MainHeadingProps {}

const MainHeading: FC<MainHeadingProps> = ({}) => {
  return (
    <h1 className="py-3 text-4xl font-black sm:py-4 sm:text-5xl lg:py-5 lg:text-6xl ">
      <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
        {`浅田智哉`}
      </span>
      {`'s `}
      <br className="block sm:hidden" />
      Portfolio Site
    </h1>
  );
};

export default MainHeading;
