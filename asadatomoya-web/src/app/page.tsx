import Image from "next/image";
import Link from "next/link";

import MainHeading from "@components/MainHeading";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-blue-900">
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
      <Link
        href={"/career"}
        className="hover:bg-blue-50 hover:text-blue-600 hover:underline"
      >
        Career
      </Link>
      <Link
        href={"/webgl"}
        className="hover:bg-blue-50 hover:text-blue-600 hover:underline"
      >
        WebGL
      </Link>
    </div>
  );
}
