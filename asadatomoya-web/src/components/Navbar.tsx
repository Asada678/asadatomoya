"use client";
import { type FC, useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface NavbarProps {}
gsap.registerPlugin(ScrollTrigger);

const Navbar: FC<NavbarProps> = ({}) => {
  const logo = useRef<HTMLImageElement>();
  const asadatomoya = useRef<HTMLImageElement>();
  useEffect(() => {
    let context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: asadatomoya.current,
        start: "center top",
        markers: true,
        onEnter() {
          gsap.to(asadatomoya.current, {
            duration: 0.3,
            opacity: 0,
            x: -10,
          });
          gsap.to(logo.current, {
            duration: 0.3,
            x: 10,
          });
        },
        onEnterBack() {
          gsap.to(asadatomoya.current, {
            duration: 0.3,
            opacity: 1,
            x: 0,
            overwrite: true,
          });
          gsap.to(logo.current, {
            duration: 0.3,
            x: 0,
            overwrite: true,
          });
        },
      });
    });

    return () => context.revert();
  }, []);

  const links = ["profile", "objects", "carrer", "qualifications"];

  return (
    <header className="sticky left-0 top-0 z-50 w-full backdrop-blur-sm">
      <div className="container flex w-full justify-between">
        <div className="">
          <Link
            className="flex rounded py-1 pl-2 pr-4 transition-colors duration-100 hover:bg-blue-50"
            href={"/"}
          >
            <Image
              src={"/img/logo/icon.webp"}
              className="relative z-20"
              width={60}
              height={60}
              alt="logo"
              ref={logo}
            />
            <Image
              src={"/img/logo/asadatomoya.webp"}
              className="relative z-0 object-contain"
              width={200}
              height={60}
              alt="logo"
              ref={asadatomoya}
            />
          </Link>
        </div>
        {/* <nav className="flex items-center">
          <ul className="flex items-center gap-2">
            {links.map((link) => (
              <li
                key={link}
                className="px-4  py-2 transition-colors duration-100 hover:bg-gray-100"
              >
                <Link href={`/${link}`}>{link}</Link>
              </li>
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Navbar;
