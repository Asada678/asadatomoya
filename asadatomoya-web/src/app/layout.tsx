import "@styles/globals.scss";

import { Montserrat, Noto_Serif_JP, Passion_One } from "next/font/google";

import { cn } from "asadatomoya-common/utils";

import WebGlLayout from "@components/WebGlLayout";

const serifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--noto-serif-jp",
});

const passionOne = Passion_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--passion-one",
});

const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  variable: "--montserrat",
  subsets: ["latin"],
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
      <body
        className={cn(
          "font-serif-jp min-h-screen dark:text-gray-200",
          serifJp.variable,
          passionOne.variable,
          montserrat.variable,
        )}
      >
        <WebGlLayout>
          <div className="container flex min-h-screen flex-col">{children}</div>
        </WebGlLayout>
      </body>
    </html>
  );
}
