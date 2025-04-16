// Importando o Mongoose
import mongoose from "mongoose";

// Criando a Tabela e seus Atributos
const SettingsSchema = new mongoose.Schema({
    temperatureLimit: Number,
    soilHumidityLimit: Number,
    airHumidityLimit: Number,
    alertActive: Boolean
});

// Criando a Coleção "Settings"
const Setting = mongoose.model("Setting", SettingsSchema);

// Exportando Setting
export default Setting;