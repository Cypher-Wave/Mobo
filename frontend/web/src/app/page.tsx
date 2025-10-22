"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/styles/layouts/SplashScreen.css";

const SplashScreen: React.FC = () => {
  const router = useRouter();
  const [, setFadeIn] = useState(false);

  useEffect(() => {
    // Inicia a animação de fade-in
    setFadeIn(true);

    // Redireciona após 2.5s
    const timer = setTimeout(() => {
      const cookies = document.cookie;
      const token = cookies
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (token) {
        router.replace("/home");
      } else {
        router.replace("/auth/login");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="intro">
      <h1 className="logo-header">
        <Image
          className="fade-in imgLogo"
          src="/images/mbRosa.png"
          alt="MOBO Logo"
          fill
        />
      </h1>
    </div>
  );
};

export default SplashScreen;
