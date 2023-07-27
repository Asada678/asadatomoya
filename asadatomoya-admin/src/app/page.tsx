"use client";
import { redirect } from "next/navigation";

import { useAuthenticator } from "@aws-amplify/ui-react";

export default async function Home() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  if (authStatus === "authenticated") {
    redirect("/home");
  } else {
    redirect("/login");
  }
}
