"use client";
import { type FC } from "react";

import { redirect, usePathname } from "next/navigation";

import { useAuthenticator } from "@aws-amplify/ui-react";

import MenuLayout from "./MenuLayout";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const pathname = usePathname();

  if (authStatus !== "authenticated") {
    if (pathname === "/login")
      return (
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
          {children}
        </div>
      );
    redirect("/login");
  }

  return <MenuLayout>{children}</MenuLayout>;
};

export default AuthLayout;
