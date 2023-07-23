"use client";
import { type FC, useEffect, useRef, useState } from "react";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "asadatomoya-common/utils";

import { isDebug, links } from "@/utils";

interface NavbarProps {}
gsap.registerPlugin(ScrollTrigger);

const Navbar: FC<NavbarProps> = ({}) => {
  const header = useRef<HTMLHeadElement>(null);
  const asadatomoya = useRef<HTMLHeadingElement>(null);
  const [isTop, setIsTop] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: header.current,
        start: "center top",
        markers: isDebug,
        onEnter() {
          setIsTop(false);
        },
        onEnterBack() {
          setIsTop(true);
        },
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <>
      <header
        className={cn("fixed left-0 top-0 z-10 w-full bg-opacity-70 py-1 md:sticky md:bg-white", {
          "shadow-sm backdrop-blur-sm": !isTop,
        })}
        ref={header}
      >
        <div className="container flex w-full px-4 md:grid md:grid-cols-3 md:p-0">
          <div className="flex items-center md:col-span-1">
            <Link href={"/"}>
              <h1
                className="font-24-48 font-passion flex items-center !italic text-orange-500 duration-200 md:hover:tracking-wide"
                ref={asadatomoya}
              >
                Asada Tomoya
              </h1>
            </Link>
          </div>
          <nav className="ml-8 hidden items-center md:col-span-2 md:flex">
            <ul className="flex items-center gap-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="px-4 py-2 transition-colors duration-100 hover:underline"
                  >
                    {link.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grow self-center text-end md:hidden">
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
                        <li key={link.path}>
                          <Link
                            href={`/${link}`}
                            onClick={() => setShowMobileMenu(false)}
                            className="px-4 py-2 transition-colors duration-100 hover:bg-gray-100 hover:underline"
                          >
                            {link.displayName}
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
