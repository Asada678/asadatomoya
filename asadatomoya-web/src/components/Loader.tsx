import { type FC, useEffect, useRef } from "react";

import { gsap } from "gsap";

import { isDebug } from "@utils";

import { useWorld } from "@context/WorldContext";

const Loader: FC = () => {
  const { ready } = useWorld();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ready && ref.current) {
      gsap.to(ref.current, {
        opacity: 0,
        duration: 1,
        ease: "slowmo",
      });
    }

    return () => {};
  }, [ready]);

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
