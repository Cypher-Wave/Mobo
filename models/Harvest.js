// Importando o Mongoose
import mongoose from "mongoose";

// Criando a Tabela e seus Atributos
const HarvestSchema = new mongoose.Schema({
    harvestedQuantity: Number,
    quality: Number,
    harvestDate: Date,
    harvestStart: String,
    harvestEnd: String,
    harvestDuration: String,
    planting: { type: mongoose.Schema.Types.ObjectId, ref: "Planting" },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" }
});

// Criando a Coleção "Harvests"
const Harvest = mongoose.model("Harvest", HarvestSchema);

// Exportando Harvest
export default Harvest;