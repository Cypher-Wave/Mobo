import express from "express";
import SensorsController from "../../controllers/views/SensorsController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/sensors", Auth, SensorsController.renderSensors);

export default router;