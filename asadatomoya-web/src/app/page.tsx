import Image from "next/image";
import Link from "next/link";

import { Mesh } from "three";

import { cn } from "asadatomoya-common/utils";

import MainHeading from "@components/MainHeading";

export default function Home() {
  return (
    <div className="py-6">
      <MainHeading />
      <Image
        src={"/img/profile.jpg"}
        width={400}
        height={400}
        className="object-contain"
        alt="profile img"
      />
      <p>1994/09/23</p>
      <p>rugby, soccer, baseball</p>
      <Link href={"/career"} className="hover:bg-blue-50 hover:text-blue-600 hover:underline">
        Career
      </Link>
      <Link
        href={"/webgl"}
        className="font-20-40 hover:bg-blue-50 hover:text-blue-600 hover:underline"
      >
        WebGL
      </Link>
    </div>
  );
}
