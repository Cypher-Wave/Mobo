import mongoose, { Schema, Document, Model } from "mongoose";
import { IPlanting } from "./Planting";
import { ISensor } from "./Sensor";

// Interface para alertas de sensores
export interface ISensorAlert {
  type: "high_temp" | "low_temp" | "high_humidity" | "low_humidity";
  value: number;      // Valor que disparou o alerta
  threshold: number;  // Limite configurado
  timestamp: Date;
  isActive: boolean;
}

// Interface principal do documento SensorData
export interface ISensorData extends Document {
  temperature?: number;
  soilHumidity?: number;
  airHumidity?: number;
  alerts?: ISensorAlert[];
  planting: IPlanting["_id"];
  sensor: ISensor["_id"];
  createdAt: Date;
  updatedAt: Date;
}

// Schema para alertas de sensores
const SensorAlertsSchema: Schema<ISensorAlert> = new Schema({
  type: {
    type: String,
    enum: ["high_temp", "low_temp", "high_humidity", "low_humidity"],
  },
  value: { type: Number },
  threshold: { type: Number },
  timestamp: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

// Schema principal do documento SensorData
const SensorDataSchema: Schema<ISensorData> = new Schema(
  {
    temperature: { type: Number },
    soilHumidity: { type: Number },
    airHumidity: { type: Number },
    alerts: { type: [SensorAlertsSchema], default: [] },
    planting: { type: mongoose.Schema.Types.ObjectId, ref: "Planting", required: true },
    sensor: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  },
  { timestamps: true }
);

// Criando o modelo de dados de sensores
const SensorData: Model<ISensorData> = mongoose.model<ISensorData>(
  "SensorData",
  SensorDataSchema
);

export default SensorData;
