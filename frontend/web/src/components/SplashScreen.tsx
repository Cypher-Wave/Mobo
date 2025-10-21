"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/SplashScreen.css";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setActive(true), 400);
    const timer2 = setTimeout(() => {
      setActive(false);
      setVisible(true);
    }, 2000);
    const timer3 = setTimeout(() => {
      onFinish();
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  return (
    <div className={`intro ${visible ? "hidden" : ""}`}>
      <div className="logo-header">
        <Image
          src="/images/mbRosa.png"
          alt="MB Logo"
          width={160}
          height={160}
          className={`logo ${active ? "active" : ""}`}
          priority
        />
      </div>
    </div>
  );
};

export default SplashScreen;
