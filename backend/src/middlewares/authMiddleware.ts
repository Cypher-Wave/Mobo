import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserPayload } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: IUserPayload;
}

// Middleware de autenticação
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // 1️⃣ Tenta pegar o token do header Authorization
  let token = req.headers.authorization?.split(" ")[1];

  // 2️⃣ Se não tiver, tenta pegar do cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token não fornecido." });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET não definido");
    const payload = jwt.verify(token, secret) as IUserPayload;
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Não autorizado." });
  }
};
