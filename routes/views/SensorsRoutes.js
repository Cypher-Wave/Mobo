import express from "express";
import renderSensors from "../../controllers/views/SensorsController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/sensors", Auth, renderSensors);

export default router;