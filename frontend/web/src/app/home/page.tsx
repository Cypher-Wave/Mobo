"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/globals.css";
import NavbarHome from "@/components/NavbarHome";
import CardSection from "@/components/CardSection";
import Footer from "@/components/Footer";
import api from "@/services/api";
import { IUser } from "@/types/User";

const Home: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const tools = [
    {
      title: "Configurações do Braço Mecânico",
      description:
        "A garra mecânica possui sensores, câmera que identifica frutos prontos para serem colhidos e controle de direção para precisão na colheita.",
      icon: "/images/icons/garraIcon.png",
      link: "/clawArm",
    },
    {
      title: "Sensores",
      description:
        "Os sensores monitoram a temperatura, a umidade do ar e a umidade do solo, garantindo um ambiente de cultivo nas condições ideais.",
      icon: "/images/icons/sensoresIcon.png",
      link: "/sensors",
    },
    {
      title: "Previsão de Colheita",
      description:
        "A previsão de colheita utiliza dados de sensores e condições climáticas para estimar o momento ideal da colheita.",
      icon: "/images/icons/lembrete-vermelho.png",
      link: "/harvestForecast",
    },
    {
      title: "Relatórios",
      description:
        "Os relatórios fornecem dados detalhados sobre o processo de colheita, permitindo o monitoramento contínuo para otimizar a qualidade e eficiência.",
      icon: "/images/icons/relatorioIcon.png",
      link: "/reports",
    },
    {
      title: "Dashboard",
      description:
        "A dashboard exibe gráficos, proporcionando uma visão clara e em tempo real dos dados do cultivo e da colheita.",
      icon: "/images/icons/dashboard.png",
      link: "/dashboard",
    },
    {
      title: "Alertas",
      description:
        "Os alertas notificam sobre mudanças nas condições ideais de temperatura e umidade, permitindo ajustes rápidos.",
      icon: "/images/icons/aviso.png",
      link: "/alerts",
    },
  ];

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="screen">
      <NavbarHome user={user} />

      <main>
        <h1 className="txt"></h1>
        <div className="banner">
          <Image
            className="imgBanner"
            src="/images/BannerOfc2.png"
            alt="Banner"
            fill
          />
        </div>
        <Image className="logo-container" src="/images/Logo.png" alt="" fill />
      </main>

      <CardSection title="Ferramentas" cards={tools} />

      <Footer />
    </div>
  );
};

export default Home;
