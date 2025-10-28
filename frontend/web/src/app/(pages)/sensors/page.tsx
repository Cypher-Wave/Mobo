"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "./Sensors.css";

const MapClient = dynamic(() => import("./components/MapClient"), { ssr: false });

const Sensors: React.FC = () => {
  return (
    <>
      <h1 className="txt">Sensores</h1>

      <div className="new-users">
        <div className="user-list">
          <MapClient />
        </div>
      </div>
      {/* Gráfico */}
      <div className="graficos">
        <div className="chart-container">
          <a href="/alerts">
            <Image
              className="alertIcons"
              src="/assets/img/icon/alerta.png"
              alt=""
              width={50}
              height={50}
            />
          </a>
          <h3 className="txtGrafic">Umidade do Solo</h3>
          <canvas id="myChart"></canvas>
        </div>
        <div>
          <h3 className="txtGrafic2">Temperatura</h3>
          <canvas id="myChart3"></canvas>
        </div>
        <div>
          <a href="/alerts">
            <Image
              className="alertIcons"
              src="/assets/img/icon/alerta.png"
              alt=""
              width={50}
              height={50}
            />
          </a>
          <h3 className="txtGrafic">Umidade do Ar</h3>
          <canvas id="myChart2"></canvas>
        </div>
      </div>
    </>
  );
};

export default Sensors;
