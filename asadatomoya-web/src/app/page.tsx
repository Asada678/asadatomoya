import Image from "next/image";

import MainHeading from "./components/MainHeading";

export default function Home() {
  return (
    <div>
      <MainHeading />
      <Image
        src={"/img/profile.jpg"}
        width={400}
        height={400}
        className="object-contain"
        alt="profile img"
      />
    </div>
  );
}
