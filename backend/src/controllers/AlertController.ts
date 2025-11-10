import { Request, Response } from "express";
import AlertService from "../services/AlertService";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

class AlertController {
  // Verificação para criar alertas
  checkAlertSensors = asyncHandler(async (req: Request, res: Response) => {
    return await AlertService.checkAlerts();
  });

  sensorsWithAlerts = asyncHandler(async (req: Request, res: Response) => {
    return await AlertService.getSensorsWithAlerts();
  })
}

export default new AlertController();
