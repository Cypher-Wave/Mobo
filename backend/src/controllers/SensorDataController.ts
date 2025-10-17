import { Response } from "express";
import SensorDataService, {
  SensorDataInput,
} from "../services/SensorDataService";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

// Controlador para operações de dados de sensores
class SensorDataController {
  // Listar todos os dados de Sensores
  getAllSensorDatas = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente" });
    }

    const sensorDatas = await SensorDataService.getAll(user);
    if (!sensorDatas) {
      return res
        .status(404)
        .json({ success: false, message: "Nenhum Dado de Sensor encontrado." });
    }
    return res.status(200).json({ success: true, sensorDatas });
  });

  // Cadastar Dado de Sensor
  createSensorData = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });
    }

    const sensorDataD: SensorDataInput = req.body;
    const newSensorData = await SensorDataService.create(user, sensorDataD);

    if (!newSensorData) {
      return res.status(400).json({
        success: false,
        message: "Não foi possível cadastrar o Dado do Sensor.",
      });
    }
    return res.sendStatus(201).json({
      success: true,
      message: "Dado de Sensor cadastrado com sucesso.",
      newSensorData,
    });
  });

  updateSensorData = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });

    const { id } = req.params;

    const sensorDataD: SensorDataInput = req.body;
    const updatedSensorData = await SensorDataService.update(
      id,
      user,
      sensorDataD
    );

    if (!updatedSensorData) {
      return res.status(404).json({
        success: false,
        message: "Dado de Sensor não encontrado ou não pôde ser atualizado.",
      });
    }
    return res.sendStatus(200).json({
      success: true,
      message: "Dado de Sensor atualizado com sucesso.",
      updatedSensorData,
    });
  });

  // Excluir Dado de Sensor
  deleteSensorData = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });

    const { id } = req.params;

    await SensorDataService.delete(id, user);
    return res
      .sendStatus(204)
      .json({ success: true, message: "Dado de Sensor deletado com sucesso." });
  });

  getOneSensorData = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Token inválido ou ausente." });

    const { id } = req.params;

    const sensorData = await SensorDataService.getOne(id, user);
    if (!sensorData)
      return res
        .status(404)
        .json({ success: false, message: "Dado de Sensor não encontrado." });
    return res.status(200).json({ success: true, sensorData });
  });
}

export default new SensorDataController();
