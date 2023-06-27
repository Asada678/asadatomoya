import "@styles/globals.scss";

import { Noto_Sans_JP } from "next/font/google";

import { cn } from "asadatomoya-common/utils";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "浅田智哉's Portfolio",
  description: "自己紹介サイトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={cn(
          "container min-h-screen text-sm sm:text-base lg:text-lg",
          noto.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
