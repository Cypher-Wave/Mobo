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
    console.log(userEmail, userPassword);

    if (!userEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        message: "E-mail e senha são obrigatórios.",
      });
    }

    const result = await UserService.authenticate({ userEmail, userPassword });

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message:
          result.message || "Falha na autenticação. Verifique as credenciais.",
      });
    }

    // Web: envia cookie HTTP-only
    if (req.headers["user-agent"]?.includes("Mozilla")) {
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
      });
    }

    // Mobile / Web SPA: retorna token no JSON
    return res.status(200).json({
      success: true,
      message: "Login efetuado com sucesso!",
      token: result.token,
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

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message || "Não foi possível criar a conta.",
      });
    }

    // Web: envia cookie HTTP-only
    if (req.headers["user-agent"]?.includes("Mozilla")) {
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
      });
    }

    // Mobile / Web SPA: retorna token no JSON
    return res.status(200).json({
      success: true,
      message: "Cadastro efetuado com sucesso!",
      token: result.token,
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
