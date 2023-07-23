import { type FC } from "react";

import Link from "next/link";

import { links } from "@/utils";

const Footer: FC = () => {
  return (
    <footer className="bg-black text-center text-white">
      <div className="container px-4 py-10 text-center">
        <h1 className="font-20-36 font-passion text-center !italic text-orange-500">
          Asada Tomoya
        </h1>
        <nav className="font-16-20 mt-4 flex justify-center">
          <ul className="flex pl-8">
            {links.map((link) => (
              <li key={link.path} className="mb-4 mr-6 underline">
                <Link href={link.path}>{link.displayName}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4">
          <p className="font-bold">連絡先</p>
          <a href="mailto:asadatomoya923@gmail.com" className="text-blue-400 underline ">
            asadatomoya923@gmail.com
          </a>
        </div>
        {/* <div className="mt-4">
          <p className="font-bold">SNS</p>
          <div className="flex items-center justify-center py-2 gap-4">
            <a href="https://twitter.com/asadatomoya923" target="_blank">
              <Twitter className="h-4 w-4" fill="white" />
            </a>
            <a href="https://twitter.com/asadatomoya923" target="_blank">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div> */}
        <div className="font-14-16 mt-6 pl-4">
          <p>© 2023 Asada Tomoya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
