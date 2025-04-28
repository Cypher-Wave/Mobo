import express from "express";
const SensorRoutes = express.Router();
import SensorController from "../../controllers/api/SensorController.js";

// Endpoint para listar todos os sensors
SensorRoutes.get("/sensors", SensorController.getAllSensors);

// Endpoint para cadastrar um sensor
SensorRoutes.post("/sensors", SensorController.createSensor);

// Endpoint para excluir um sensor
SensorRoutes.delete("/sensors/:id", SensorController.deleteSensor);

// Endpoint para alterar um sensor
SensorRoutes.put("/sensors/:id", SensorController.updateSensor);

// Endpoint para listar um único sensor
SensorRoutes.get("/sensors/:id", SensorController.getOneSensor);

export default SensorRoutes;
