import mongoose from "mongoose";

// Schema principal de plantações
const PlantingSchema = new mongoose.Schema(
  {
    plantingName: String,
    plantingDate: Date,
    plantedArea: Number,
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

// Compilando o modelo e criando a collection plantings
const Planting = mongoose.model("Planting", PlantingSchema);

export default Planting;
