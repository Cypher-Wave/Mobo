import express from "express";
import getAlerts from "../../controllers/views/AlertController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/alerts", getAlerts);

export default router;
