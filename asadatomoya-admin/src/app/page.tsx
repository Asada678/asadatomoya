import { redirect } from "next/navigation";

import { getAuthSession } from "@/utils/auth";

export default async function Home() {
  const session = await getAuthSession();
  console.log("session:", session);

  if (!!session) {
    redirect("/home");
  } else {
    redirect("/login");
  }
}
