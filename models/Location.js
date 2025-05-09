import mongoose from "mongoose";

// Schema principal de localizações
const LocationSchema = new mongoose.Schema(
  {
    locationName: String,
    longitude: Number,
    latitude: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

// Compilando o modelo e criando a collection locations
const Location = mongoose.model("Location", LocationSchema);

export default Location;
