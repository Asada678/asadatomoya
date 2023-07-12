import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="font-serif-jp">{children}</div>;
}
