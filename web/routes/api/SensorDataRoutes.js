import express from "express";
const SensorDataRoutes = express.Router();
import SensorDataController from "../../controllers/api/SensorDataController.js";

// Endpoint para listar todos os dados de sensores
SensorDataRoutes.get("/sensor-datas", SensorDataController.getAllSensorDatas);

// Endpoint para cadastrar um dado de sensor
SensorDataRoutes.post("/sensor-datas", SensorDataController.createSensorData);

// Endpoint para excluir um dado de sensor
SensorDataRoutes.delete(
  "/sensor-datas/:id",
  SensorDataController.deleteSensorData
);

// Endpoint para alterar um dado de sensor
SensorDataRoutes.put(
  "/sensor-datas/:id",
  SensorDataController.updateSensorData
);

// Endpoint para listar um único dado de sensor
SensorDataRoutes.get(
  "/sensor-datas/:id",
  SensorDataController.getOneSensorData
);

export default SensorDataRoutes;
