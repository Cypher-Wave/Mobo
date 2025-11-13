import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import ProfileService from "../services/ProfileService";
import asyncHandler from "../utils/asyncHandler";

class ProfileController {
  // Pegar Imagens de Colheita que pertencem ao usuário logado
  getUserImage = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });
    }

    const images = await ProfileService.getUserImages(user.id);
    if (!images) {
      return res.status(200).json({
        success: true,
        message: "Nenhuma Imagem foi encontrada.",
        images: [],
      });
    }

    return res.status(200).json({ success: true, images });
  });

  // Guardar Imagens de Colheita do usuário
  uploadImage = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Nenhum arquivo foi enviado." });
    }

    const imageName = req.file.filename;

    const result = await ProfileService.uploadImage(user.id, imageName);

    return res.status(201).json({
      success: true,
      message: "Imagem enviada com sucesso!",
      image: result,
    });
  });
}

export default new ProfileController();
