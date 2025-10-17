import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

// Middleware para validar ObjectId
export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }
  next();
};