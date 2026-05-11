import Image from "next/image";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.toggle}>
        <div className={styles.logo}>
          <Image src="/images/mbBege.png" alt="Mobo logo" fill />
        </div>
      </div>

      <nav className={styles.sidebar}>
        <Link href="/home">
          <span>Home</span>
        </Link>
        <Link href="/harvester">
          <span>Braço Mecânico</span>
        </Link>
        <Link href="/dashboard">
          <span>Dashboard</span>
        </Link>
        <Link href="/sensor">
          <span>Sensores</span>
        </Link>
        <Link href="/report">
          <span>Relatórios</span>
        </Link>
        <Link href="/alert">
          <span>Alertas</span>
        </Link>
        <Link href="/forecast">
          <span>Previsão Colheita</span>
        </Link>
        <Link href="/profile">
          <span>Perfil</span>
        </Link>

        <Link className={styles.land} href="#">
          <Image
            className={styles.iconLand}
            src="/images/icons/adicionar.png"
            alt="Adicionar Terreno"
            width={20}
            height={20}
          />
          Terreno
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
