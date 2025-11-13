import Image from "next/image";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.footerTitle}>@CyperWaves</h2>

      <div className={styles.moboFooter}>
        <Image
          src="/images/moboFooter.png"
          alt="Mascote Flutuando"
          fill
        />
      </div>

      <div className={styles.waves}>
        <div className={`${styles.wave} ${styles.wave1}`}></div>
        <div className={`${styles.wave} ${styles.wave2}`}></div>
        <div className={`${styles.wave} ${styles.wave3}`}></div>
        <div className={`${styles.wave} ${styles.wave4}`}></div>
      </div>
    </footer>
  );
};

export default Footer;
