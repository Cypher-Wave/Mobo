import { Response } from "express";
import PlantingService, { PlantingInput } from "../services/PlantingService";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

// Controlador para operações de plantações
class PlantingController {
  // Listar todas as Plantações
  getAllPlantings = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });
    }

    const plantings = await PlantingService.getAll(user);
    if (!plantings) {
      return res.status(404).json({
        success: false,
        message: "Nenhuma plantação encontrada.",
      });
    }
    return res.status(200).json({ success: true, plantings });
  });

  // Criar Plantação
  createPlanting = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });
    }

    const plantingData: PlantingInput = req.body;
    const newPlanting = await PlantingService.create(user, plantingData);

    if (!newPlanting) {
      return res.status(400).json({
        success: false,
        message: "Não foi possível cadastrar a plantação.",
      });
    }
    return res.sendStatus(201).json({
      success: true,
      message: "Plantação cadastrada com sucesso.",
      newPlanting,
    });
  });

  // Atualizar Plantação
  updatePlanting = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });

    const { id } = req.params;

    const plantingData: PlantingInput = req.body;
    const updatedPlanting = await PlantingService.update(
      id,
      user,
      plantingData
    );

    if (!updatedPlanting) {
      return res.status(404).json({
        success: false,
        message: "Plantação não encontrada ou não pôde ser atualizada.",
      });
    }
    return res.sendStatus(200).json({
      success: true,
      message: "Plantação atualizada com sucesso.",
      updatedPlanting,
    });
  });

  // Deletar Plantação
  deletePlanting = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });

    const { id } = req.params;

    await PlantingService.delete(id, user);
    return res.sendStatus(204).json({
      success: true,
      message: "Plantação deletada com sucesso.",
    });
  });

  // Buscar uma plantação específica
  getOnePlanting = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });

    const { id } = req.params;

    const planting = await PlantingService.getOne(id, user);
    if (!planting)
      return res
        .status(404)
        .json({ success: false, message: "Plantação não encontrada." });
    return res.status(200).json({ success: true, planting });
  });
}

export default new PlantingController();
