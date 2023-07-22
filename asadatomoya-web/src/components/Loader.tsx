import { type FC, useEffect, useRef } from "react";

import { gsap } from "gsap";

import { isDebug } from "@/utils";

const Loader: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        opacity: 0,
        duration: 1,
        pointerEvents: "none",
        ease: "slowmo",
      });
    }

    return () => {};
  }, []);

  return (
    !isDebug && (
      <div
        className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black"
        ref={ref}
      >
        <h2 className="font-36-60 italic text-white">Loading...</h2>
      </div>
    )
  );
};

export default Loader;
