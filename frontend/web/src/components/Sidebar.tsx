import React from "react";
import Image from "next/image";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar-container">
      <div className="toggle">
        <div className="logo">
          <Image
            src="/images/mbBege.png"
            alt="Mobo logo"
            width={1200}
            height={300}
          />
        </div>
        <div className="close" id="close-btn">
          <span className="material-icons-sharp">close</span>
        </div>
      </div>

      <nav className="sidebar">
        <NavLink to="/home">
          <span>Home</span>
        </NavLink>
        <NavLink to="/clawArm">
          <span>Braço Mecânico</span>
        </NavLink>
        <NavLink to="/dashboard">
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/sensors">
          <span>Sensores</span>
        </NavLink>
        <NavLink to="/reports">
          <span>Relatórios</span>
        </NavLink>
        <NavLink to="/alerts">
          <span>Alertas</span>
        </NavLink>
        <NavLink to="/harvestForecast">
          <span>Previsão Colheita</span>
        </NavLink>
        <NavLink to="/profile">
          <span>Perfil</span>
        </NavLink>

        <NavLink className="Terreno" to="/land">
          <Image
            className="IconTerren"
            src="/images/icons/adicionar.png"
            alt="Adicionar Terreno"
          />
          Terreno
        </NavLink>

        <NavLink className="Logout" to="/logout">
          <Image
            width="20"
            src="/images/icons/botao-de-logout.png"
            alt="Logout"
          />
          Logout
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
