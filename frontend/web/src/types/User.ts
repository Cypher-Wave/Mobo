export type UserRole = "family_farmer" | "company_admin" | "company_worker";

export interface IUser {
  id: string;
  userName: string;
  userEmail: string;
  userRole?: UserRole;
  company?: string;
  userImage?: string;
}
