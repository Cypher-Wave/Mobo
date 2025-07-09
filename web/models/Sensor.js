import mongoose from "mongoose";

// Schema para configurações programadas para o sensor
const SettingSchema = new mongoose.Schema({
  temperatureLimit: {
    type: Number,
    required: function () {
      return this.sensorType === "temperature"; // Obrigatório apenas para temperatura
    },
    validate: {
      validator: function (v) {
        // Bloqueia se não for "temperature" OU se o valor for inválido
        return this.sensorType !== "temperature" || (v >= -10 && v <= 50);
      },
      message: "Limite de temperatura deve estar entre -10°C e 50°C",
    },
  },
  soilHumidityLimit: {
    type: Number,
    required: function () {
      return this.sensorType === "soil_humidity"; // Obrigatório apenas para humidade de solo
    },
    validate: {
      validator: function (v) {
        // Bloqueia se não for "soil_humidity" OU se o valor for inválido
        return this.sensorType !== "soil_humidity" || (v >= 0 && v <= 100);
      },
    },
  },
  airHumidityLimit: {
    type: Number,
    required: function () {
      return this.sensorType === "air_humidity"; // Obrigatório apenas para humidade do ar
    },
    validate: {
      validator: function (v) {
        // Bloqueia se não for "air_humidity"
        return this.sensorType !== "air_humidity";
      },
    },
  },
});

// Schema principal de sensores
const SensorSchema = new mongoose.Schema(
  {
    sensorType: {
      type: [String],
      enum: ["air_humidity", "soil_humidity", "temperature"],
      required: true,
    },
    sensorNumeration: String,
    sensorAccuracy: Number,
    measuringRange: String,
    setting: SettingSchema,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

// Compilando o modelo e criando a collection sensors
const Sensor = mongoose.model("Sensor", SensorSchema);

export default Sensor;
