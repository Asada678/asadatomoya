import { type FC, HTMLAttributes} from "react";

interface MainHeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

const MainHeading: FC<MainHeadingProps> = ({ className, style }) => {
  return (
    <h1 className={`${className} relative drop-shadow-2xl font-48-110 font-black dark:text-gray-200`} style={style}>
      <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-400 bg-clip-text text-transparent">
        {`浅田智哉`}
      </span>
      {`'s `}
      <br />
      <span className="">Portfolio Site</span>
      {/* <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-transparent via-transparent to-black opacity-50"></div> */}
    </h1>
  );
};

export default MainHeading;
