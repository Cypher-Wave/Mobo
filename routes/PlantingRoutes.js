import express from "express";
const PlantingRoutes = express.Router();
import PlantingController from "../controllers/PlantingController.js";

// Endpoint para listar todas as plantações
PlantingRoutes.get("/plantings", PlantingController.getAllPlantings);

// Endpoint para cadastrar uma plantação
PlantingRoutes.post("/plantings", PlantingController.createPlanting);

// Endpoint para excluir uma plantação
PlantingRoutes.delete("/plantings/:id", PlantingController.deletePlanting);

// Endpoint para alterar uma plantação
PlantingRoutes.put("/plantings/:id", PlantingController.updatePlanting);

// Endpoint para listar uma única plantação
PlantingRoutes.get("/plantings/:id", PlantingController.getOnePlanting);

export default PlantingRoutes;
