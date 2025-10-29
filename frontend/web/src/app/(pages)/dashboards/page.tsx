"use client";

import React from "react";
import DashboardChart from "./components/DashboardsCharts";
import { qualityData, weeklyHarvestData, growthData, totalHarvestData } from "./libraries/DashboardService";
import "./Dashboards.css";

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

const Dashboards: React.FC<DashboardsProps> = ({ harvests = [] }) => {
  return (
    <>
      <h1>Dashboard</h1>

      <div className="graphics">
        <div className="dash" style={{ width: "100%", height: "300px" }}>
          <DashboardChart type="bar" data={qualityData} title="Qualidade de Colheita" />
        </div>

        <div className="dash" style={{ width: "100%", height: "300px" }}>
          <DashboardChart type="line" data={weeklyHarvestData} title="Colheita da Semana" />
        </div>

        <div className="dash" style={{ width: "100%", height: "300px" }}>
          <DashboardChart type="line" data={growthData} title="Tendência Crescimento" />
        </div>

        <div className="dash" style={{ width: "100%", height: "300px" }}>
          <DashboardChart type="pie" data={totalHarvestData} title="Total Colhido" />
        </div>
      </div>
    </>
  );
};

export default Dashboards;
