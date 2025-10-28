import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar-container">
      <div className="toggle">
        <div className="logo">
          <Image
            src="/images/mbBege.png"
            alt="Mobo logo"
            fill
          />
        </div>
      </div>

      <nav className="sidebar">
        <Link href="/home">
          <span>Home</span>
        </Link>
        <Link href="/harvesters">
          <span>Braço Mecânico</span>
        </Link>
        <Link href="/dashboards">
          <span>Dashboard</span>
        </Link>
        <Link href="/sensors">
          <span>Sensores</span>
        </Link>
        <Link href="/reports">
          <span>Relatórios</span>
        </Link>
        <Link href="/alerts">
          <span>Alertas</span>
        </Link>
        <Link href="/forecast">
          <span>Previsão Colheita</span>
        </Link>
        <Link href="/profile">
          <span>Perfil</span>
        </Link>

        <Link className="land" href="/land">
          <Image
            className="icon-land"
            src="/images/icons/adicionar.png"
            alt="Adicionar Terreno"
            width={20}
            height={20}
          />
          Terreno
        </Link>

        <Link className="logout" href="/logout">
          <Image
            src="/images/icons/botao-de-logout.png"
            alt="Logout"
            width={20}
            height={20}
          />
          Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
