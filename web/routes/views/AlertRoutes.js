import express from "express";
import AlertController from "../../controllers/views/AlertController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/alerts", Auth, AlertController.render);

export default router;
