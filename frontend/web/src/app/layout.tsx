// src/components/Layout.tsx
import React, { ReactNode } from "react";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Footer />
    </>
  );
};

export default Layout;
