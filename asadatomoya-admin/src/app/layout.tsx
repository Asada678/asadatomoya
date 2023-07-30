import "@/styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import "react-quill/dist/quill.snow.css";

import { Noto_Sans_JP } from "next/font/google";

import { cn } from "asadatomoya-common/utils";

import Providers from "@/components/Providers";
import AuthLayout from "@/components/layout/AuthLayout";

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
  return (
    <html lang="ja">
      <body className={cn("", sansJp.variable)}>
        <Providers>
          <AuthLayout>{children}</AuthLayout>
        </Providers>
      </body>
    </html>
  );
}
