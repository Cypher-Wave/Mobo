import express from "express";
import renderHarvestForecast from "../../controllers/views/HarvestForecastController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/harvestForecast", renderHarvestForecast);

export default router;