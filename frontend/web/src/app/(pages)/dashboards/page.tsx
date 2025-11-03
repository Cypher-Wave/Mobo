"use client";

import { useState, useEffect } from "react";
import {
  qualityData,
  weeklyHarvestData,
  growthData,
  totalHarvestData,
} from "./libraries/DashboardService";
import Chart from "@/components/Chart/Chart";
import { IHarvest } from "@/types/Harvest";
import api from "@/services/api";
import styles from "./Dashboards.module.css";

const Dashboards = () => {
  const [harvests, setHarvests] = useState<IHarvest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        const res = await api.get("/harvests");
        setHarvests(res.data.harvests);
      } catch (error) {
        console.error("Erro ao buscar harvests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHarvests();
  }, []);

  if (loading) return <div>Carregando dados...</div>;

  return (
    <>
      <div className={styles.graphics}>
        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <Chart
            type="bar"
            data={qualityData(harvests)}
            title="Qualidade de Colheita"
          />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <Chart
            type="line"
            data={weeklyHarvestData(harvests)}
            title="Colheita da Semana"
          />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <Chart
            type="line"
            data={growthData(harvests)}
            title="Tendência Crescimento"
          />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <Chart
            type="pie"
            data={totalHarvestData(harvests)}
            title="Total Colhido"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboards;
