import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar-container">
      <div className="toggle">
        <div className="logo">
          <img src="/assets/img/mbBege.png" alt="Mobo logo" />
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
          <img
            className="IconTerren"
            src="/assets/img/icon/adicionar.png"
            alt="Adicionar Terreno"
          />
          Terreno
        </NavLink>

        <NavLink className="Logout" to="/logout">
          <img
            width="20px"
            src="/assets/img/icon/botao-de-logout.png"
            alt="Logout"
          />
          Logout
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
