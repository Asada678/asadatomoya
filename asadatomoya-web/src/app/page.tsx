import Image from "next/image";

import type { User } from "asadatomoya-common/types";
import { Abc, Post } from "asadatomoya-common/types";

import A from "./A";
import B from "./B";
import Sample from "./Sample";

let myVar: User = {
  id: "1",
  name: "asadatomoya",
  email: "asada",
};

myVar = { id: "1", name: "asadatomoya", email: "asada" };
let post: Post = { post_id: "asada" };

export default function Home() {
  return (
    <div>
      <Sample />
      <A />
      <B />
    </div>
  );
}
