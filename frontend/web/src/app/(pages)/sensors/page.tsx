"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  temperature,
  airHumidity,
  soilHumidity,
} from "./libraries/SensorService";
import Chart from "@/components/Chart/Chart";
import MapClient from "./components/MapClient";
import "leaflet/dist/leaflet.css";
import { ISensorData } from "@/types/SensorData";
import api from "@/services/api";
import styles from "./Sensors.module.css";

const Sensors = () => {
  const [sensor, setSensor] = useState<ISensorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        const res = await api.get("/sensordata");
        setSensor(res.data.sensorDatas);
      } catch (error) {
        console.error("Erro ao buscar sensores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHarvests();
  }, []);

  if (loading) return <div>Carregando dados...</div>;

  return (
    <>
      <div className={styles.userList}>
        <MapClient />
      </div>

      {/* Gráficos */}
      <div className={styles.graphics}>
        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <a href="/alerts">
            <div className={styles.alertIcons}>
              <Image src="/images/icons/alerta.png" alt="" fill />
            </div>
          </a>
          <Chart type="pie" data={soilHumidity(sensor)} title="Umidade do Solo" />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <a href="/alerts">
            <div className={styles.alertIcons}>
              <Image src="/images/icons/alerta.png" alt="" fill />
            </div>
          </a>
          <Chart type="pie" data={temperature(sensor)} title="Temperatura" />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <a href="/alerts">
            <div className={styles.alertIcons}>
              <Image src="/images/icons/alerta.png" alt="" fill />
            </div>
          </a>
          <Chart type="pie" data={airHumidity(sensor)} title="Umidade do Ar" />
        </div>
      </div>
    </>
  );
};

export default Sensors;
