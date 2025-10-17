import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";
import { ICompany } from "./Company";

// Interface para configurações do sensor
interface ISetting {
  temperatureLimit?: number;
  soilHumidityLimit?: number;
  airHumidityLimit?: number;
}

// Interface principal do documento Sensor
export interface ISensor extends Document {
  sensorType: ("air_humidity" | "soil_humidity" | "temperature")[];
  sensorNumeration?: string;
  sensorAccuracy?: number;
  measuringRange?: string;
  setting?: ISetting;
  user?: IUser["_id"];
  company?: ICompany["_id"];
  createdAt: Date;
  updatedAt: Date;
}

// Schema para configurações do sensor
const SettingSchema: Schema<ISetting> = new Schema({
  temperatureLimit: {
    type: Number,
    required: function (this: ISensor) {
      return this.sensorType.includes("temperature");
    },
    validate: {
      validator: function (v: number) {
        return v >= -10 && v <= 50;
      },
      message: "Limite de temperatura deve estar entre -10°C e 50°C",
    },
  },
  soilHumidityLimit: {
    type: Number,
    required: function (this: ISensor) {
      return this.sensorType.includes("soil_humidity");
    },
    validate: {
      validator: function (v: number) {
        return v >= 0 && v <= 100;
      },
    },
  },
  airHumidityLimit: {
    type: Number,
    required: function (this: ISensor) {
      return this.sensorType.includes("air_humidity");
    },
  },
});

// Schema principal do documento Sensor
const SensorSchema: Schema<ISensor> = new Schema(
  {
    sensorType: {
      type: [String],
      enum: ["air_humidity", "soil_humidity", "temperature"],
      required: true,
    },
    sensorNumeration: { type: String },
    sensorAccuracy: { type: Number },
    measuringRange: { type: String },
    setting: { type: SettingSchema },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

// Criando o modelo de sensores
const Sensor: Model<ISensor> = mongoose.model<ISensor>("Sensor", SensorSchema);

export default Sensor;