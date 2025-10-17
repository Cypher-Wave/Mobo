import { Request, Response } from "express";
import UserService, { UserInput } from "../services/UserService";
import asyncHandler from "../utils/asyncHandler";
import { generateToken, IUserPayload } from "../utils/jwt";

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

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message:
          result.message || "Falha na autenticação. Verifique as credenciais.",
      });
    }

    // Payload do JWT
    const payload: IUserPayload = {
      id: result.user!.id,
      userRole: result.user!.userRole as
        | "family_farmer"
        | "company_admin"
        | "company_worker",
      company: result.user?.company,
    };

    const token = generateToken(payload);

    // Web: envia cookie HTTP-only
    if (req.headers["user-agent"]?.includes("Mozilla")) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
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

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message || "Não foi possível criar a conta.",
      });
    }

    const payload: IUserPayload = {
      id: result.user!.id,
      userRole: result.user!.userRole as
        | "family_farmer"
        | "company_admin"
        | "company_worker",
      company: result.user?.company,
    };
    const token = generateToken(payload);

    // Web: envia cookie HTTP-only
    if (req.headers["user-agent"]?.includes("Mozilla")) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
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
