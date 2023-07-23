import { type FC } from "react";

import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <Loader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Background />
      </div>
    </>
  );
};

export default GlobalLayout;
