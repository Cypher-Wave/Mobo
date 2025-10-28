import { Request, Response } from "express";
import dotenv from "dotenv";
import UserService, { UserInput } from "../services/UserService";
import asyncHandler from "../utils/asyncHandler";
import { generateToken, IUserPayload } from "../utils/jwt";

dotenv.config();

class AuthController {
  // Login
  login = asyncHandler(async (req: Request, res: Response) => {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        message: "E-mail e senha são obrigatórios.",
      });
    }

    const result = await UserService.authenticate({ userEmail, userPassword });
    const token = result.token;

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message:
          result.message || "Falha na autenticação. Verifique as credenciais.",
      });
    }

    // Web: envia cookie HTTP-only
    if (req.headers["user-agent"]?.includes("Mozilla")) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
        path: "/",
        domain: "localhost",
      });
    }

    // Mobile / Web SPA: retorna token no JSON
    return res.status(200).json({
      success: true,
      message: "Login efetuado com sucesso!",
      token,
      user: result.user,
    });
  });

  // Registro de usuário
  register = asyncHandler(async (req: Request, res: Response) => {
    const userData: UserInput = {
      ...req.body,
      userImage: req.file
        ? (req.file as Express.Multer.File).filename
        : undefined,
    };

    const result = await UserService.create(userData);
    const token = result.token;

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message || "Não foi possível criar a conta.",
      });
    }

    // Web: envia cookie HTTP-only
    if (req.headers["user-agent"]?.includes("Mozilla")) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
        path: "/",
        domain: "localhost",
      });
    }

    // Mobile / Web SPA: retorna token no JSON
    return res.status(200).json({
      success: true,
      message: "Cadastro efetuado com sucesso!",
      token,
      user: result.user,
    });
  });

  // Logout (sem sessão, apenas front precisa remover token)
  logout = asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logout efetuado com sucesso." });
  });
}

export default new AuthController();
