"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/services/api";
import styles from "@/styles/layouts/SplashScreen.module.css";

const SplashScreen = () => {
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
    <div className={styles.intro}>
      <h1 className={`${styles.logoHeader} ${fadeIn ? "fade-in" : ""}`}>
        <Image
          className={styles.introLogo}
          src="/images/mbRosa.png"
          alt="MOBO Logo"
          fill
        />
      </h1>
    </div>
  );
};

export default SplashScreen;
