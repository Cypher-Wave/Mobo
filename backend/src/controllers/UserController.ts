import { Response } from "express";
import UserService, { UserInput } from "../services/UserService";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

class UserController {
  // Listar todos os usuários - Empresa
  getAllUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
    const companyId = req.user?.company;
    const users = await UserService.getAll(companyId);

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nenhum usuário encontrado para esta empresa.",
      });
    }
    return res.status(200).json({
      success: true,
      users,
    });
  });

  // Atualizar usuário - Pessoal
  updateUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.user!.id;

    const userData: UserInput = {
      ...req.body,
      userImage: req.file
        ? (req.file as Express.Multer.File).filename
        : undefined,
    };

    const updatedUser = await UserService.update(id, userData);

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Não foi possível atualizar o usuário.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Usuário atualizado com sucesso.",
      updatedUser,
    });
  });

  // Deletar usuário - Pessoal
  deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.user!.id;
    await UserService.delete(id);
    return res
      .sendStatus(204)
      .json({ success: true, message: "Conta deletada com sucesso." });
  });

  // Buscar um usuário - Pessoal
  getOneUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.user!.id;

    const user = await UserService.getOne(id);
    if (!user) {
      return res
        .sendStatus(404)
        .json({ success: false, message: "Usuário não encontrado." });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  });
}

export default new UserController();
