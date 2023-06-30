import "@styles/globals.scss";

import { Noto_Sans_JP } from "next/font/google";

import { cn } from "asadatomoya-common/utils";

import WebGlLayout from "@components/WebGlLayout";

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
      <body className={cn("min-h-screen dark:text-gray-200", noto.className)}>
        <WebGlLayout>
          <div className="container flex min-h-screen flex-col">{children}</div>
        </WebGlLayout>
      </body>
    </html>
  );
}
