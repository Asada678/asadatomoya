"use client";
import { type FC, useEffect, useRef, useState } from "react";
import React from "react";

import { Passion_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewport } from "@context/ViewportContext";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import DialogDemo from "./DialogDemo";

const passionOne = Passion_One({
  subsets: ["latin"],
  weight: ["400"],
});
const links = ["webgl", "three", "career", "qualifications"];

interface NavbarProps {}
gsap.registerPlugin(ScrollTrigger);

const Navbar: FC<NavbarProps> = ({}) => {
  const logo = useRef<HTMLImageElement>(null);
  const asadatomoya = useRef<HTMLHeadingElement>(null);
  const [isTop, setIsTop] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { viewport } = useViewport();

  useEffect(() => {
    const context = gsap.context(() => {
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

    return () => {
      context.revert();
    };
  }, []);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <>
      <header className={`sticky left-0 top-0 z-40 w-full ${isTop ? "" : "backdrop-blur-sm"}`}>
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
              <h1
                className={`font-24-48 flex items-center !italic ${passionOne.className}`}
                ref={asadatomoya}
              >
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
          <div className="grow self-center text-end md:hidden">
            <Dialog.Root open={showMobileMenu} onOpenChange={toggleMobileMenu}>
              <Dialog.Trigger asChild>
                <button
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white p-4"
                  onClick={toggleMobileMenu}
                >
                  {showMobileMenu ? <Cross2Icon /> : <HamburgerMenuIcon />}
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-overlay fixed inset-0" />
                <Dialog.Content className="animate-in fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[6px] bg-white focus:outline-none">
                  <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Edit profile 123
                  </Dialog.Title>

                  <div>menu here</div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit assumenda
                    distinctio reiciendis, quia vero necessitatibus accusantium dolore, atque
                    blanditiis consectetur corrupti illum adipisci ipsam recusandae natus aspernatur
                    molestias! Eveniet, quibusdam? Dolor accusamus eveniet at, perspiciatis optio,
                    eum atque eaque, reprehenderit distinctio recusandae nisi similique quaerat!
                    Eius hic reprehenderit assumenda tempora eum iste eaque quo numquam quibusdam?
                    Labore reprehenderit porro iusto veniam minus dolore numquam facilis!
                    Exercitationem assumenda est enim eligendi recusandae similique accusamus error?
                    Iure beatae et rem, veniam sint totam aut cum labore nihil eligendi facere porro
                    hic ducimus dolor a qui iusto necessitatibus. Pariatur vero iure incidunt atque
                    distinctio quisquam cupiditate quibusdam iusto. Veniam deleniti in eos sapiente
                    obcaecati aliquam illo at! Molestias vitae repudiandae ut ratione quasi nam rem
                    ducimus laudantium culpa consequuntur tenetur, veritatis minima saepe qui
                    assumenda earum ipsam, consectetur dolores iure alias numquam suscipit quidem!
                    Consectetur, praesentium dolore recusandae voluptatem soluta officiis esse
                    commodi et enim, nemo, accusantium repellendus impedit ipsum. Quos doloribus,
                    molestias animi magni porro ipsa perferendis quidem voluptate officiis
                    dignissimos impedit tempora exercitationem aspernatur dicta deleniti beatae
                    necessitatibus obcaecati iure laboriosam? Placeat, quod alias ea distinctio
                    aperiam accusamus maxime eveniet tempore ipsa debitis, sequi illum voluptatum
                    delectus recusandae aspernatur nulla molestias, magni dolor sit? Rem quam
                    doloribus voluptatem iusto, error accusamus veritatis dolorem modi sed magni
                    culpa sint, quibusdam laborum? Modi, non. Sit, est! Corrupti est iure, illum
                    aspernatur alias enim molestiae harum voluptatem quae beatae consequuntur,
                    pariatur libero facere sunt totam, doloribus hic earum possimus amet doloremque
                    odio modi iusto delectus cum! Autem in similique ullam ex, error dicta deleniti
                    aspernatur odio repellendus sequi vero neque quasi aut est consectetur?
                    Exercitationem unde voluptate delectus ipsa cumque quis asperiores deleniti
                    eaque doloremque, ratione, non id obcaecati laudantium illo voluptatem amet
                    provident distinctio? Culpa ut minima sapiente illum sunt quasi maxime cumque
                    voluptatem optio rem? Modi voluptatem vero quam nisi incidunt cumque nemo nobis
                    ab dolore inventore, quisquam omnis laudantium saepe culpa sint, assumenda sunt
                    natus minima aliquam odio labore? Itaque beatae architecto ipsam inventore
                    numquam, dignissimos magnam nihil aspernatur laudantium iure deserunt est hic
                    facilis, repellat quas explicabo, ex culpa? Consequuntur eligendi beatae
                    ratione, voluptatem accusamus modi mollitia quidem sed itaque adipisci
                    excepturi! Voluptatum repudiandae nesciunt ad quia exercitationem dolorem odio
                    eos dolor accusantium molestiae. Sed natus, beatae soluta culpa atque quasi
                    dolores aliquid eius maiores! Distinctio tenetur delectus debitis voluptatem
                    placeat, molestias laboriosam beatae veniam perferendis error consectetur,
                    voluptatum nam deserunt officiis, optio culpa quae? Pariatur animi nesciunt
                    reiciendis quis in officia itaque natus nihil, deleniti commodi numquam id error
                    fugit, soluta doloribus quia eius nostrum dolorem voluptatem? Voluptatem, eos?
                    Voluptates quas velit ducimus mollitia iure accusantium id eos, temporibus ipsum
                    porro ipsa dolorem, sapiente perferendis quod nulla vitae sint, in pariatur.
                    Quisquam dolores perferendis numquam, minus impedit omnis, id ut incidunt illum
                    eius non est recusandae nostrum labore, beatae iste veritatis iure quos
                    consequatur. Beatae suscipit dolore laboriosam cum aliquid molestiae esse rerum
                    eveniet. Vel fuga a, dolorum quae sapiente facilis saepe, iste corrupti sit
                    laudantium eveniet, unde nostrum?
                  </p>

                  <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                      <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                        Save changes
                      </button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className="focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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
