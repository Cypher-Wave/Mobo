"use client";

import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import RightSection from "@/components/RightSection/RightSection";
import { usePathname } from "next/navigation";
import styles from "@/styles/layouts/Pages.module.css";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let title;

  const pathname = usePathname();
  const showProfile = !pathname.includes("/profile");
  const showNotification = !pathname.includes("/alerts");

  const page = pathname.split("/").filter(Boolean).pop() || "home";

  const titleMap: Record<string, string> = {
    alerts: "Alerta",
    dashboards: "Dashboard",
    profile: "Perfil",
    sensors: "Sensores",
    forecast: "Previsão",
    reports: "Relatórios",
    harvesters: "Colheitadeiras",
    home: "Home",
  };

  const pageTitle =
  titleMap[page.toLowerCase()] ||
  page
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="container">
      <Sidebar />

      <main>
        <h1 className={style.title}>{pageTitle}</h1>
        {children}
      </main>

      <RightSection
        showProfile={showProfile}
        showNotification={showNotification}
      />
    </div>
  );
}
