import { type FC, HTMLAttributes, ReactNode } from "react";

interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const SectionHeading: FC<SectionHeadingProps> = ({ children, className, style }) => {
  return (
    <h2 className={`${className} font-36-60 font-black`} style={style}>
      <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-400 bg-clip-text text-transparent">
        {children}
      </span>
    </h2>
  );
};

export default SectionHeading;
