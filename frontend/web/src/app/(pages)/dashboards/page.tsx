"use client";

import { qualityData, weeklyHarvestData, growthData, totalHarvestData } from "./libraries/DashboardService";
import Chart from "@/components/Chart/Chart";
import styles from "./Dashboards.module.css";

interface Harvest {
  _id: string;
  harvestDate: string;
  harvestStart: string;
  harvestEnd: string;
  harvestDuration: string;
  harvestedQuantity: number;
  planting: { plantingName: string };
  quality: number;
}

interface DashboardsProps {
  harvests?: Harvest[];
}

const Dashboards = ({ harvests = [] }: DashboardsProps) => {
  return (
    <>
      <div className={styles.graphics}>
        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <Chart type="bar" data={qualityData} title="Qualidade de Colheita" />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <Chart type="line" data={weeklyHarvestData} title="Colheita da Semana" />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <Chart type="line" data={growthData} title="Tendência Crescimento" />
        </div>

        <div className={styles.dash} style={{ width: "100%", height: "300px" }}>
          <Chart type="pie" data={totalHarvestData} title="Total Colhido" />
        </div>
      </div>
    </>
  );
};

export default Dashboards;
