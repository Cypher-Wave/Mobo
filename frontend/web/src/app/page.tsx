"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavbarHome from "../components/NavbarHome";
import CardSection from "../components/CardSection";
import Footer from "../components/Footer";
import api from "../services/api";
import { IUser } from "../types/User";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await api.get("/user/me");
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push("/login")
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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-100 to-pink-50">
      <NavbarHome user={user} />

      <main className="text-center mt-8">
        <div className="banner mb-6">
          <Image
            src="/images/BannerOfc2.png"
            alt="Banner"
            className="mx-auto rounded-lg shadow-md"
          />
        </div>

        <Image src="/images/Logo.png" alt="Logo" className="mx-auto w-28 mb-6" />

        <form action="/search" method="GET" className="flex justify-center mb-12">
          <div className="flex items-center border-2 border-pink-600 rounded-full px-6 py-3 bg-white shadow-md w-3/4 max-w-2xl">
            <input
              type="text"
              placeholder="Digite sua pesquisa..."
              className="flex-grow outline-none text-gray-700 placeholder-gray-400"
            />
            <button type="submit" className="ml-3">
              <Image
                src="/images/icons/lupa-de-pesquisa.png"
                width={20}
                alt="Pesquisar"
              />
            </button>
          </div>
        </form>

        <CardSection title="Ferramentas" cards={tools} />

        <Image src="/images/mobotst3.png" alt="Mascote" className="mx-auto mt-16 w-60" />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
