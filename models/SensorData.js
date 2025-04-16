// Importando o Mongoose
import mongoose from "mongoose";

// Criando a Tabela e seus Atributos
const SensorDataSchema = new mongoose.Schema({
    timeStamp: Date,
    temperature: Number,
    soilHumidity: Number,
    airHumidity: Number,
    locationId: ObjectId 
});

// Criando a Coleção "SensorData"
const SensorData = mongoose.model("SensorData", SensorDataSchema);

// Exportando SensorData
export default SensorData;