"use client";
import { type FC, useEffect, useRef, useState } from "react";
import React from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlignJustify, EqualNot, Home, Pen } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { cn } from "asadatomoya-common/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
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
        className={cn(
          "fixed left-0 top-0 z-10 w-full bg-opacity-70 py-1 md:sticky md:bg-white md:dark:bg-black md:dark:bg-opacity-70",
          {
            "shadow-sm backdrop-blur-sm": !isTop,
          },
        )}
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

          {/* PC menu */}
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

          {/* Mobile menu */}
          <div className="grow self-center text-end md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignJustify className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="border-gray-200 py-4 bg-gray-100 dark:bg-black dark:bg-opacity-60"
                align="end"
              >
                <DropdownMenuItem className="">
                  <Home className="mr-3" />
                  <Link href="/">home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="mt-3">
                  <Pen className="mr-3" />
                  <Link href="/blog">blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="mt-3">
                  <EqualNot className="mr-3" />
                  <Link href="/notequal">notequal</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
