import jwt from "jsonwebtoken";

export interface IUserPayload {
  id: string;
  userRole: "family_farmer" | "company_admin" | "company_worker";
  company?: string;
}

// Função para gerar token JWT
export const generateToken = (payload: IUserPayload) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET não definido");

  // Expiração em 1 dia (24h)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 * 1000 });
};
