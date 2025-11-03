export type IUserRole = "family_farmer" | "company_admin" | "company_worker";

export interface IUser {
  id: string;
  userName: string;
  userEmail: string;
  userRole: IUserRole;
  company?: string;
  userImage?: string;
}
