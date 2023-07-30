"use client";
import { type FC } from "react";

import { redirect, usePathname } from "next/navigation";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

import awsConfig from "@/aws-exports";

import MenuLayout from "./MenuLayout";

Amplify.configure(awsConfig);

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const pathname = usePathname();

  if (authStatus !== "authenticated") {
    if (pathname === "/login") {
      return (
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
          {children}
        </div>
      );
    } else if (authStatus === "unauthenticated") {
      redirect("/login");
    }
  } else {
    return <MenuLayout>{children}</MenuLayout>;
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">loading...</div>
  );
};

export default AuthLayout;
