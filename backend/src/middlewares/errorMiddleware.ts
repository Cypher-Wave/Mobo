import { Request, Response, NextFunction } from "express";

// Middleware global para tratar erros do servidor
export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Erro não tratado:", error);
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor.",
  });
}
