import { type FC } from "react";

interface MainHeadingProps {}

const MainHeading: FC<MainHeadingProps> = ({}) => {
  return (
    <h1 className="font-36-60 font-black">
      <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
        {`浅田智哉`}
      </span>
      {`'s `}
      <br className="block sm:hidden" />
      <span className="inline-block sm:block">Portfolio Site</span>
    </h1>
  );
};

export default MainHeading;
