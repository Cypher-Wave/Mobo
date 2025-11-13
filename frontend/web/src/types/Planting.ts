import { IUser } from "./User";
import { ICompany } from "./Company";

interface ILocation {
  longitude: number;
  latitude: number;
}

export interface IPlanting {
  id: string;
  plantingName: string;
  plantingDate: Date;
  plantedArea: number;
  location: ILocation;
  user?: IUser["id"];
  company?: ICompany["id"];
  createdAt: Date;
  updatedAt: Date;
}
