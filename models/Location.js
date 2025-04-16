// Importando o Mongoose
import mongoose from "mongoose";

// Criando a Tabela e seus Atributos
const LocationSchema = new mongoose.Schema({
    locationName: String,
    longitude: Number,
    latitude: Number
});

// Criando a Coleção "Locations"
const Location = mongoose.model("Location", LocationSchema);

// Exportando Location
export default Location;