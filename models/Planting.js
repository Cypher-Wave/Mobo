// Importando o Mongoose
import mongoose from "mongoose";

// Criando a Tabela e seus Atributos
const PlantingSchema = new mongoose.Schema({
    plantingName: String,
    plantingDate: Date,
    plantedArea: Number,
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
});

// Criando a Coleção "Plantings"
const Planting = mongoose.model("Planting", PlantingSchema);

// Exportando Planting
export default Planting;