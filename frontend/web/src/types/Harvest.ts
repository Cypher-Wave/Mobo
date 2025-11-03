import { IPlanting } from "./Planting";
import { IUser } from "./User";
import { ICompany } from "./Company";

export interface IHarvest {
  harvestedQuantity: number;
  quality: number;
  harvestDate?: Date;
  harvestStart?: string;
  harvestEnd?: string;
  harvestDuration?: string;
  planting?: string | IPlanting;
  user?: IUser["id"];
  company?: ICompany["id"];
  createdAt: Date;
  updatedAt: Date;
}
