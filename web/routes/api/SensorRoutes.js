import express from "express";
const SensorRoutes = express.Router();
import SensorController from "../../controllers/api/SensorController.js";
import Auth from "../../middleware/Auth.js";

// Endpoint para listar todos os sensors
SensorRoutes.get("/sensors", Auth, SensorController.getAllSensors);

// Endpoint para cadastrar um sensor
SensorRoutes.post("/sensors", Auth, SensorController.createSensor);

// Endpoint para excluir um sensor
SensorRoutes.delete("/sensors/:id", Auth, SensorController.deleteSensor);

// Endpoint para alterar um sensor
SensorRoutes.put("/sensors/:id", Auth, SensorController.updateSensor);

// Endpoint para listar um único sensor
SensorRoutes.get("/sensors/:id", Auth, SensorController.getOneSensor);

export default SensorRoutes;
