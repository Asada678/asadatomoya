import { ReactNode } from "react";

import WebGlProvider from "@/components/WebGlProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <WebGlProvider>
      <div className="font-serif-jp">{children}</div>
    </WebGlProvider>
  );
}
