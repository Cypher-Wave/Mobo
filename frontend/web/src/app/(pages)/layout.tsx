"use client";

import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import RightSection from "@/components/RightSection/RightSection";
import { usePathname } from "next/navigation";
import "@/styles/layouts/Pages.css";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showProfile = !pathname.includes("/profile");
  return (
    <div className="container">
      <Sidebar />
      <main>{children}</main>
      <RightSection showProfile={showProfile} />
    </div>
  );
}
