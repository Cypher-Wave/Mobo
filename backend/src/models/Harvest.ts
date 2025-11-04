import mongoose, { Schema, Document, Model } from "mongoose";
import { IPlanting } from "./Planting";
import { IUser } from "./User";
import { ICompany } from "./Company";

// Interface principal do documento Harvest
export interface IHarvest extends Document {
  harvestedQuantity: number;
  quality: number;
  harvestDate: Date;
  harvestStart: string;
  harvestEnd: string;
  harvestDuration: string;
  planting: IPlanting["_id"];
  user?: IUser["_id"];
  company?: ICompany["_id"];
  createdAt: Date;
  updatedAt: Date;
}

// Schema principal do documento Harvest
const HarvestSchema: Schema<IHarvest> = new Schema(
  {
    harvestedQuantity: { type: Number },
    quality: { type: Number },
    harvestDate: { type: Date },
    harvestStart: { type: String },
    harvestEnd: { type: String },
    harvestDuration: { type: String },
    planting: { type: mongoose.Schema.Types.ObjectId, ref: "Planting" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

// Criando o modelo da colheita
const Harvest: Model<IHarvest> = mongoose.model<IHarvest>("Harvest", HarvestSchema);

export default Harvest;
