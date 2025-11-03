"use client";

import Image from "next/image";
import {
  temperature,
  airHumidity,
  soilHumidity,
} from "./libraries/SensorService";
import Chart from "@/components/Chart/Chart";
import MapClient from "./components/MapClient";
import "leaflet/dist/leaflet.css";
import styles from "./Sensors.module.css";

const Sensors = () => {
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
          <Chart type="pie" data={soilHumidity} title="Umidade do Solo" />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <a href="/alerts">
            <div className={styles.alertIcons}>
              <Image src="/images/icons/alerta.png" alt="" fill />
            </div>
          </a>
          <Chart type="pie" data={temperature} title="Temperatura" />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <a href="/alerts">
            <div className={styles.alertIcons}>
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
