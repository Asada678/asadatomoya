import { type FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { links } from "@/utils";

const Footer: FC = () => {
  return (
    <footer className="bg-black text-center text-white">
      <div className="container px-4 py-10 text-center">
        <Link className="flex justify-center rounded py-1" href={"/"}>
          <Image
            src={"/img/logo/icon.webp"}
            className="relative z-20 h-12 w-12"
            width={48}
            height={48}
            alt="logo"
          />
          <h1 className="font-20-36 font-passion flex items-center !italic">Asada Tomoya</h1>
        </Link>
        <nav className="font-16-20 mb-8 mt-4 flex justify-center">
          <ul className="flex pl-8">
            {links.map((link) => (
              <li key={link.path} className="mb-4 mr-6">
                <Link href={link.path}>{link.displayName}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="font-14-16 pl-4">
          <p>© 2023 Asada Tomoya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
