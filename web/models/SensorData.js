import mongoose from "mongoose";

// Schema para alertas
const SensorAlertsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["high_temp", "low_temp", "high_humidity", "low_humidity"],
  },
  value: Number, // Valor que disparou o alerta (ex: 35°C)
  threshold: Number, // Limite configurado (ex: 30°C)
  timestamp: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

// Schema principal de dados de sensores
const SensorDataSchema = new mongoose.Schema(
  {
    temperature: Number,
    soilHumidity: Number,
    airHumidity: Number,
    alerts: [SensorAlertsSchema],
    planting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Planting",
      required: true,
    },
    sensor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor",
      required: true,
    },
  },
  { timestamps: true }
);

// Compilando o modelo e criando a collection sensordatas
const SensorData = mongoose.model("SensorData", SensorDataSchema);

export default SensorData;
