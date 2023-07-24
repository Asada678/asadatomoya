import { type FC } from "react";

import Link from "next/link";

import { Github, Instagram, Twitter } from "lucide-react";

import { links, sns } from "@/utils";

const Footer: FC = () => {
  return (
    <footer className="bg-black text-center text-white">
      <div className="container px-4 py-12 text-center">
        <h1 className="font-24-36 font-passion text-center !italic text-orange-500">
          Asada Tomoya
        </h1>

        {/* links */}
        <nav className="font-16-20 mt-4 flex justify-center">
          <ul className="flex pl-8">
            {links.map((link) => (
              <li
                key={link.path}
                className="mb-4 mr-6 underline transition-colors duration-200 hover:text-blue-400"
              >
                <Link href={link.path}>{link.displayName}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4">
          <p className="font-bold">連絡先</p>
          <a href="mailto:asada.tomoya0923@gmail.com" className="text-blue-400 underline ">
            asada.tomoya0923@gmail.com
          </a>
        </div>

        {/* sns */}
        {/* <div className="mt-4">
          <p className="font-bold">SNS</p>
          <div className="flex items-center justify-center gap-5 py-2">
            {sns.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                {s.service === "twitter" ? (
                  <Twitter className="h-4 w-4 sm:h-6 sm:w-6" />
                ) : s.service === "instagram" ? (
                  <Instagram className="h-4 w-4 sm:h-6 sm:w-6" />
                ) : s.service === "github" ? (
                  <Github className="h-4 w-4 sm:h-6 sm:w-6" />
                ) : null}
              </a>
            ))}
          </div>
        </div> */}
        <div className="font-14-16 mt-6 pl-4">
          <p className="font-serif-jp italic">© 2023 Asada Tomoya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
