"use client";
import { type FC, useEffect, useLayoutEffect, useState } from "react";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import MenuLayout from "./MenuLayout";

interface SessionLayoutProps {
  children: React.ReactNode;
}

const SessionLayout: FC<SessionLayoutProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [visible, setVisible] = useState(false);
  const { data } = useSession();

  useLayoutEffect(() => {
    setSession(data);
    return () => {};
  }, [data]);

  useEffect(() => {
    setVisible(!!session);
    if (session === null) setVisible(true);
    return () => {};
  }, [session]);

  if (!visible) return <div>loading...</div>;

  if (session === null) return <div>{children}</div>;

  return <MenuLayout>{children}</MenuLayout>;
};

export default SessionLayout;
