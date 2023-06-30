"use client";
import { type FC, useEffect, useRef, useState } from "react";

import { Passion_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const passionOne = Passion_One({
  subsets: ["latin"],
  weight: ["400"],
});

interface NavbarProps {}
gsap.registerPlugin(ScrollTrigger);

const Navbar: FC<NavbarProps> = ({}) => {
  const logo = useRef<HTMLImageElement>(null);
  const asadatomoya = useRef<HTMLHeadingElement>(null);
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    gsap.context(() => {
      ScrollTrigger.create({
        trigger: asadatomoya.current,
        start: "center top",
        // markers: true,
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
          setIsTop(false);
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
          setIsTop(true);
        },
      });
    });
  }, [isTop]);

  const links = ["webgl", "three", "career", "qualifications"];

  return (
    <>
      <header className={`sticky left-0 top-0 z-50 w-full ${isTop ? "" : "backdrop-blur-sm"}`}>
        <div className="container flex w-full flex-wrap justify-between">
          <div className="">
            <Link className="flex rounded py-1" href={"/"}>
              <Image
                src={"/img/logo/icon.webp"}
                className="relative z-20 h-14 w-14"
                width={60}
                height={60}
                alt="logo"
                ref={logo}
              />
              <h1
                className={`font-24-48 flex items-center !italic ${passionOne.className}`}
                ref={asadatomoya}
              >
                Asada Tomoya
              </h1>
            </Link>
          </div>
          <nav className="flex items-center">
            <ul className="flex items-center gap-2">
              {links.map((link) => (
                <li
                  key={link}
                  className="px-4 py-2 transition-colors duration-100 hover:bg-gray-100"
                >
                  <Link href={`/${link}`}>{link}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
