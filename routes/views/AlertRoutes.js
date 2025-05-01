import express from "express";
import getAlerts from "../../controllers/views/AlertController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/alerts", Auth, getAlerts);

export default router;
