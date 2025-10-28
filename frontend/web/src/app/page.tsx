"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/styles/layouts/SplashScreen.css";
import api from "@/services/api";

const SplashScreen: React.FC = () => {
  const router = useRouter();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Inicia a animação de fade-in
    setFadeIn(true);

    const checkAuth = async () => {
      try {
        const res = await api.get("/user/me");
        if (res.data.user) {
          router.replace("/home"); // usuário logado
        } else {
          router.replace("/auth/login"); // não logado
        }
      } catch (error) {
        router.replace("/auth/login"); // erro na requisição
      }
    };

    // Aguarda 2.5s para animação e checa autenticação
    const timer = setTimeout(checkAuth, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="intro">
      <h1 className={`logo-header ${fadeIn ? "fade-in" : ""}`}>
        <Image
          className="intro-logo"
          src="/images/mbRosa.png"
          alt="MOBO Logo"
          fill
        />
      </h1>
    </div>
  );
};

export default SplashScreen;
