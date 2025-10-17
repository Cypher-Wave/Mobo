import express from "express";
import HarvestForecastController from "../../controllers/views/HarvestForecastController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/harvestForecast", Auth, HarvestForecastController.render);

export default router;