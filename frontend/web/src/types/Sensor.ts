import { IUser } from "./User";
import { ICompany } from "./Company";

interface ISetting {
  temperatureLimit?: number;
  soilHumidityLimit?: number;
  airHumidityLimit?: number;
}

// Interface principal do documento Sensor
export interface ISensor {
  id: string;
  sensorType: "air_humidity" | "soil_humidity" | "temperature";
  sensorNumeration?: string;
  sensorAccuracy?: number;
  measuringRange?: string;
  setting?: ISetting;
  user?: IUser["id"];
  company?: ICompany["id"];
  createdAt: Date;
  updatedAt: Date;
}
