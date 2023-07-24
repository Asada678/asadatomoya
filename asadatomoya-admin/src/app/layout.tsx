import "@/styles/globals.css";
import { Noto_Sans_JP } from "next/font/google";

import { cn } from "asadatomoya-common/utils";

import MenuLayout from "@/components/layout/MenuLayout";

const sansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--noto-sans-jp",
});

export const metadata = {
  title: "浅田智哉's 管理画面",
  description: "自己紹介サイト管理画面です。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const session = 1;
  return (
    <html lang="ja">
      <body className={cn("", sansJp.variable)}>
        <div className="">
          {session === null ? (
            <div className="">{children}</div>
          ) : (
            <MenuLayout>{children}</MenuLayout>
          )}
        </div>
      </body>
    </html>
  );
}
