import { Response } from "express";
import { ObjectId } from "mongodb";
import HarvestService, { HarvestInput } from "../services/HarvestService";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

// Controller de colheitas
class HarvestController {
  // Listar todas as colheitas
  getAllHarvests = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Pega página e limite da query string (default: page 1, limit 10)
    const user = req.user!;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });
    }

    const harvests = await HarvestService.getAll(user);

    if (!harvests) {
      return res.status(200).json({
        success: true,
        message: "Nenhuma colheita encontrada.",
      });
    }

    return res.status(200).json({
      success: true,
      harvests,
    });
  });

  // Listar as colheitas Paginadas
  getPaginatedHarvests = asyncHandler(
    async (req: AuthRequest, res: Response) => {
      // Pega página e limite da query string (default: page 1, limit 10)
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      // user vem do middleware JWT
      const user = req.user!;
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Token inválido ou ausente." });
      }

      // Chama o service paginado
      const paginatedResult = await HarvestService.getPaginated(
        user,
        page,
        limit
      );

      if (!paginatedResult || paginatedResult.results.length === 0) {
        return res.status(200).json({
          success: true,
          message: "Nenhuma colheita nesta página.",
          harvests: [],
          totalPages: paginatedResult.totalPages,
          totalCount: paginatedResult.total,
          currentPage: paginatedResult.currentPage,
        });
      }

      return res.status(200).json({
        success: true,
        harvests: paginatedResult.results,
        totalPages: paginatedResult.totalPages,
        totalCount: paginatedResult.total,
        currentPage: paginatedResult.currentPage,
      });
    }
  );

  // Criar colheita
  createHarvest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });
    }

    const harvestData: HarvestInput = req.body;

    if (!ObjectId.isValid(harvestData.planting)) {
      return res.status(400).json({ success: false, message: "ID inválido." });
    }

    const newHarvest = await HarvestService.create(user, harvestData);

    if (!newHarvest) {
      return res.status(400).json({
        success: false,
        message: "Não foi possível cadastrar a colheita.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Colheita cadastrada com sucesso.",
      newHarvest,
    });
  });

  // Atualizar colheita
  updateHarvest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });

    const { id } = req.params;

    const harvestData: HarvestInput = req.body;

    const updatedHarvest = await HarvestService.update(id, user, harvestData);

    if (!updatedHarvest) {
      return res.status(404).json({
        success: false,
        message: "Colheita não encontrada ou não pôde ser atualizada.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Colheita atualizada com sucesso.",
      updatedHarvest,
    });
  });

  // Deletar colheita
  deleteManyHarvests = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token inválido ou ausente.",
      });
    }

    const { ids } = req.body;

    if (!ids || (Array.isArray(ids) && ids.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Nenhum ID foi informado para exclusão.",
      });
    }

    await HarvestService.deleteMany(user, ids);

    return res.status(200).json({
      success: true,
      message: "Colheitas deletadas com sucesso.",
    });
  });

  // Buscar uma colheita específica
  getOneHarvest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });

    const { id } = req.params;

    const harvest = await HarvestService.getOne(id, user);
    if (!harvest)
      return res
        .status(404)
        .json({ success: false, message: "Colheita não encontrada." });

    return res.status(200).json({ success: true, harvest });
  });
}

export default new HarvestController();
