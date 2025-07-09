import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    longitude: Number,
    latitude: Number
  }
)

// Schema principal de plantações
const PlantingSchema = new mongoose.Schema(
  {
    plantingName: String,
    plantingDate: Date,
    plantedArea: Number,
    location: LocationSchema,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

// Compilando o modelo e criando a collection plantings
const Planting = mongoose.model("Planting", PlantingSchema);

export default Planting;
