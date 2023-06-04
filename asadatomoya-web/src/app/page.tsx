import Image from "next/image";

import MainHeading from "./components/MainHeading";

export default function Home() {
  return (
    <div className="container flex min-h-screen flex-col bg-white dark:bg-blue-900">
      <MainHeading />
      <Image
        src={"/img/profile.jpg"}
        width={400}
        height={400}
        className="object-contain"
        alt="profile img"
      />
      1994/09/23
    </div>
  );
}
