import mongoose from "mongoose";

// Schema principal de dados de sensores
const SensorDataSchema = new mongoose.Schema(
  {
    temperature: Number,
    soilHumidity: Number,
    airHumidity: Number,
    alertActive: { type: Boolean, default: false },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
    sensor: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  },
  { timestamps: true }
);

// Compilando o modelo e criando a collection sensordatas
const SensorData = mongoose.model("SensorData", SensorDataSchema);

export default SensorData;
