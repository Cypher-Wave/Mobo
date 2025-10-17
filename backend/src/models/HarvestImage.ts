import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";

// Interface principal do documento HarvestImage
export interface IHarvestImage extends Document {
  user: IUser["_id"];
  imageName: string;
  description?: string;
  createdAt: Date;
}

// Schema principal do documento HarvestImage
const HarvestImageSchema: Schema<IHarvestImage> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageName: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Criando o modelo de imagens de colheita
const HarvestImage: Model<IHarvestImage> = mongoose.model<IHarvestImage>(
  "HarvestImage",
  HarvestImageSchema
);

export default HarvestImage;
