import mongoose from "mongoose";

// Schema principal de colheitas
const HarvestSchema = new mongoose.Schema(
  {
    harvestedQuantity: Number,
    quality: Number,
    harvestDate: Date,
    harvestStart: String,
    harvestEnd: String,
    harvestDuration: String,
    planting: { type: mongoose.Schema.Types.ObjectId, ref: "Planting" },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  },
  { timestamps: true }
);

// Compilando o modelo e criando a collection harvests
const Harvest = mongoose.model("Harvest", HarvestSchema);

export default Harvest;
