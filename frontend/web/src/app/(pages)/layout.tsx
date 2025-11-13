"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import RightSection from "@/components/RightSection/RightSection";
import api from "@/services/api";
import styles from "@/styles/layouts/Pages.module.css";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      } catch (error) {
        router.replace("/auth/login");
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return null;
  if (!user) return null;

  const page = pathname.split("/").filter(Boolean).pop() || "home";

  const titleMap: Record<string, string> = {
    alerts: "Alerta",
    dashboards: "Dashboard",
    profile: "Perfil",
    sensors: "Sensores",
    forecast: "Previsão de Colheita",
    reports: "Relatórios",
    harvesters: "Configurações do Braço Mecânico",
  };

  const pageTitle =
    titleMap[page.toLowerCase()] ||
    page.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <div className={styles.container}>
        <Sidebar />

        <main className={styles.main}>
          <h1 className={styles.title}>{pageTitle}</h1>
          {children}
        </main>

        <RightSection />
      </div>
    </>
  );
}
