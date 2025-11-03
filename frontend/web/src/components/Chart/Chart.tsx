"use client";

import { Bar, Line, Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps<T extends "bar" | "line" | "pie"> {
  type: T;
  data: ChartData<T>;
  title: string;
}

const Chart = <T extends "bar" | "line" | "pie">({
  type,
  data,
  title,
}: ChartProps<T>) => {
  const commonOptions: ChartOptions<"bar" | "line" | "pie"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
    },
  };

  if (type === "bar")
    return (
      <Bar
        data={data as ChartData<"bar">}
        options={commonOptions as ChartOptions<"bar">}
      />
    );
  if (type === "line")
    return (
      <Line
        data={data as ChartData<"line">}
        options={commonOptions as ChartOptions<"line">}
      />
    );
  if (type === "pie")
    return (
      <Pie
        data={data as ChartData<"pie">}
        options={commonOptions as ChartOptions<"pie">}
      />
    );

  return null;
};

export default Chart;
