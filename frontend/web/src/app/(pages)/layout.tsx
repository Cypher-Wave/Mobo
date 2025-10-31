"use client";

import React, { useState, useEffect } from "react";
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
  const showNotification = !pathname.includes("/alerts");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Espera um tick para garantir que CSS, DOM e layout inicial foram aplicados
    requestAnimationFrame(() => {
      setReady(true);
    });
  }, []);

  if (!ready) {
    return <div style={{ opacity: 0 }} />;
  }

  return (
    <div className="layout-wrapper">
      <div className="container">
        <Sidebar />
        
        <main>{children}</main>

        <RightSection
          showProfile={showProfile}
          showNotification={showNotification}
        />
      </div>
    </div>
  );
}
