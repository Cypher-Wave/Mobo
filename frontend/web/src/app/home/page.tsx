"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavbarHome from "@/components/NavbarHome/NavbarHome";
import CardSection from "@/components/CardSection/CardSection";
import Footer from "@/components/Footer/Footer";
import "./Home.css";

const Home: React.FC = () => {
  const router = useRouter();

  const tools = [
    {
      title: "Configurações do Braço Mecânico",
      description:
        "A garra mecânica possui sensores, câmera que identifica frutos prontos para serem colhidos e controle de direção para precisão na colheita.",
      icon: "/images/icons/garraIcon.png",
      link: "/harvesters",
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
      link: "/forecast",
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
      link: "/dashboards",
    },
    {
      title: "Alertas",
      description:
        "Os alertas notificam sobre mudanças nas condições ideais de temperatura e umidade, permitindo ajustes rápidos.",
      icon: "/images/icons/aviso.png",
      link: "/alerts",
    },
  ];

  return (
    <>
      <NavbarHome />
      <main>
        <div className="banner">
          <Image
            className="img-banner"
            src="/images/BannerOfc.png"
            alt="Banner"
            fill
          />
          <div className="logo-container">
            <Image className="logo" src="/images/Logo.png" alt="Logo" fill />
          </div>
        </div>
        <CardSection title="Ferramentas" cards={tools} />
        <div className="mascotFooter-container">
          <Image
            className="mascotFooter"
            src="/images/mobotst3.png"
            alt="Mascote"
            fill
          />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
