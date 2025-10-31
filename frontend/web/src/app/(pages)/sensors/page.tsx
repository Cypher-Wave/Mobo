"use client";

import React from "react";
import Image from "next/image";
import {
  temperature,
  airHumidity,
  soilHumidity,
} from "./libraries/SensorService";
import Chart from "@/components/Chart/Chart";
import MapClient from "./components/MapClient";
import "leaflet/dist/leaflet.css";
import "./Sensors.css";

const Sensors: React.FC = () => {
  return (
    <>
      <h1>Sensores</h1>

      <div className="new-users">
        <div className="user-list">
          <MapClient />
        </div>
      </div>
      {/* Gráfico */}
      <div className="graphics">
        <div className="dash" style={{ width: "100%", height: "300px" }}>
          <a href="/alerts">
            <div className="alert-icons">
              <Image src="/images/icons/alerta.png" alt="" fill />
            </div>
          </a>
          <Chart type="pie" data={soilHumidity} title="Umidade do Solo" />
        </div>
        <div className="dash" style={{ width: "100%", height: "300px" }}>
          <a href="/alerts">
            <div className="alert-icons">
              <Image src="/images/icons/alerta.png" alt="" fill />
            </div>
          </a>
          <Chart type="pie" data={temperature} title="Temperatura" />
        </div>
        <div className="dash" style={{ width: "100%", height: "300px" }}>
          <a href="/alerts">
            <div className="alert-icons">
              <Image src="/images/icons/alerta.png" alt="" fill />
            </div>
          </a>
          <Chart type="pie" data={airHumidity} title="Umidade do Ar" />
        </div>
      </div>
    </>
  );
};

export default Sensors;
