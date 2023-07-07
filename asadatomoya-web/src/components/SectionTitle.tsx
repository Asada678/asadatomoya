import { type FC, HTMLAttributes } from "react";

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SectionTitle: FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h2 className={`${className} font-montserrat font-36-60 relative mb-6 text-center font-bold xl:text-left`}>
      <span className="inline-block uppercase">{children}</span>
    </h2>
  );
};

export default SectionTitle;
