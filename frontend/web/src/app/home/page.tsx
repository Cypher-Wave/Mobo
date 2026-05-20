"use client";

import Image from "next/image";
import NavbarHome from "@/components/NavbarHome/NavbarHome";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <NavbarHome />

      <main className={styles.homeMain}>

        {/* ===== Banner Hero ===== */}
        <div className={styles.banner}>
          <Image
            className={styles.imgBanner}
            src="/images/banner.png"
            alt="Banner"
            fill
            priority
          />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.bold}>Revolucione</span> sua{" "}
              <span className={styles.bold}>Produção</span>
              <br />
              de Lichia com{" "}
              <span className={`${styles.bold} ${styles.underlined}`}>
                Automação
                <br />
                Inteligente
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Sistema inteligente e tecnologia avançada que automatizam
              todo o processo de colheita, reduzindo perdas e garantindo
              eficiência, escala e resultados superiores.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
