import { redirect } from "next/navigation";

export default function Home() {
  // const session = await getAuthSession();
  const session = 1;

  if (session) {
    redirect("/home");
  } else {
    redirect("/login");
  }
}
