import express from "express";
import renderSensors from "../../controllers/views/SensorsController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/sensors", renderSensors);

export default router;