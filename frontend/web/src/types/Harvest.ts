import { IPlanting } from "./Planting";
import { IUser } from "./User";
import { ICompany } from "./Company";

export interface IHarvest {
  _id: string;
  harvestedQuantity: number;
  quality: number;
  harvestDate: Date;
  harvestStart: string;
  harvestEnd: string;
  harvestDuration: string;
  planting: IPlanting;
  user?: IUser;
  company?: ICompany;
  createdAt: Date;
  updatedAt: Date;
}
