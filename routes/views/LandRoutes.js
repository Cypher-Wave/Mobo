import express from "express";
import renderLand from "../../controllers/views/LandController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/land", renderLand);

export default router;