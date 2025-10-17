import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";
import { ICompany } from "./Company";

// Interface para localização geográfica
interface ILocation {
  longitude: number;
  latitude: number;
}

// Interface principal da plantação
export interface IPlanting extends Document {
  plantingName?: string;
  plantingDate?: Date;
  plantedArea?: number;
  location?: ILocation;
  user?: IUser["_id"];
  company?: ICompany["_id"];
  createdAt: Date;
  updatedAt: Date;
}

// Schema para localização geográfica
const LocationSchema: Schema<ILocation> = new Schema({
  longitude: { type: Number },
  latitude: { type: Number },
});

// Schema principal da plantação
const PlantingSchema: Schema<IPlanting> = new Schema(
  {
    plantingName: { type: String },
    plantingDate: { type: Date },
    plantedArea: { type: Number },
    location: { type: LocationSchema },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

// Criando o modelo da plantação
const Planting: Model<IPlanting> = mongoose.model<IPlanting>("Planting", PlantingSchema);

export default Planting;