import "@styles/globals.scss";

import { Noto_Sans_JP } from "next/font/google";

import { cn } from "asadatomoya-common/utils";

import Navbar from "@components/Navbar";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "浅田智哉's Portfolio",
  description: "自己紹介サイトです。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={cn("container min-h-screen", noto.className)}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
