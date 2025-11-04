import { IPlanting } from "./Planting";
import { ISensor } from "./Sensor";

interface ISensorAlert {
  type: "high_temp" | "low_temp" | "high_humidity" | "low_humidity";
  value: number;      // Valor que disparou o alerta
  threshold: number;  // Limite configurado
  timestamp: Date;
  isActive: boolean;
}

export interface ISensorData {
  temperature?: number;
  soilHumidity?: number;
  airHumidity?: number;
  alerts?: ISensorAlert[];
  planting: IPlanting;
  sensor: ISensor["id"];
  createdAt: Date;
  updatedAt: Date;
}