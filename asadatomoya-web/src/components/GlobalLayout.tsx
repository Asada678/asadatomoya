"use client";
import { type FC } from "react";

import Background from "./Background";
import Footer from "./Footer";
import Loader from "./Loader";
import Navbar from "./Navbar";

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
