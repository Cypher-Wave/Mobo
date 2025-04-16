// Importando o Mongoose
import mongoose from "mongoose";

// Criando a Tabela e seus Atributos
const SensorSchema = new mongoose.Schema({
    sensorType: String,
    sensorNumeration: String,
    sensorAccuracy: Number,
    measuringRange: Number,
    setting: {type: mongoose.Schema.Types.ObjectId, ref: "Setting" }
});

// Criando a Coleção "Sensors"
const Sensor = mongoose.model("Sensor", SensorSchema);

// Exportando Sensor
export default Sensor;