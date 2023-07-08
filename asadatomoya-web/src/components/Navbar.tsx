"use client";
import { type FC, useEffect, useRef, useState } from "react";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { config, isDebug } from "@utils";

import { useViewport } from "@context/ViewportContext";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const links = config.nav.items;

interface NavbarProps {}
gsap.registerPlugin(ScrollTrigger);

const Navbar: FC<NavbarProps> = ({}) => {
  const logo = useRef<HTMLImageElement>(null);
  const asadatomoya = useRef<HTMLHeadingElement>(null);
  const [isTop, setIsTop] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { viewport } = useViewport();

  useEffect(() => {
    if (viewport.width === 0) return;
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: asadatomoya.current,
        start: "center top",
        markers: true,
        onEnter() {
          setIsTop(false);
          if (viewport.isMobile) {
            gsap.to(asadatomoya.current, {
              duration: 0.3,
              opacity: 0,
              x: -10,
            });
            gsap.to(logo.current, {
              duration: 0.3,
              x: 10,
            });
          }
        },
        onEnterBack() {
          setIsTop(true);
          // if (viewport.isMobile) {
          // TODO 実機だとoverwriteが上手く動かない
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
          // }
        },
      });
    });

    return () => {
      context.revert();
    };
  }, [viewport]);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <>
      <header className={`sticky left-0 top-0 z-10 w-full ${isTop ? "" : "backdrop-blur-sm"}`}>
        <div className="container flex w-full">
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
              <h1 className="font-24-48 font-passion flex items-center !italic" ref={asadatomoya}>
                Asada Tomoya
              </h1>
            </Link>
          </div>
          <nav className="ml-8 hidden items-center md:flex">
            <ul className="flex items-center gap-2">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link}`}
                    className="px-4 py-2 transition-colors duration-100 hover:bg-gray-100 hover:underline"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grow self-center pr-4 text-end md:hidden">
            <Dialog.Root open={showMobileMenu} onOpenChange={toggleMobileMenu}>
              <Dialog.Trigger asChild>
                <button
                  className="inline-flex h-12 items-center justify-center rounded-md text-gray-700"
                  onClick={toggleMobileMenu}
                >
                  {showMobileMenu ? (
                    <Cross2Icon height={30} width={30} />
                  ) : (
                    <HamburgerMenuIcon height={30} width={30} />
                  )}
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-overlay fixed inset-0" />
                <Dialog.Content className="animate-in fixed left-1/2 top-1/2 z-50 h-[85vh] w-[300px] max-w-[450px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white">
                  <Dialog.Title className="text-mauve12 font-24-48 m-0 text-center font-bold uppercase">
                    Menu
                  </Dialog.Title>

                  <nav className="ml-8 flex items-center">
                    <ul className="flex flex-col gap-4">
                      {links.map((link) => (
                        <li key={link}>
                          <Link
                            href={`/${link}`}
                            onClick={() => setShowMobileMenu(false)}
                            className="px-4 py-2 transition-colors duration-100 hover:bg-gray-100 hover:underline"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <Dialog.Close asChild>
                    <button
                      className="focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
                      aria-label="Close"
                    >
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
