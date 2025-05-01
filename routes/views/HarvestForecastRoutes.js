import express from "express";
import renderHarvestForecast from "../../controllers/views/HarvestForecastController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/harvestForecast", Auth, renderHarvestForecast);

export default router;