import express from "express";
const PlantingRoutes = express.Router();
import PlantingController from "../../controllers/api/PlantingController.js";
import Auth from "../../middleware/Auth.js";

// Endpoint para listar todas as plantações
PlantingRoutes.get("/plantings", Auth, PlantingController.getAllPlantings);

// Endpoint para cadastrar uma plantação
PlantingRoutes.post("/plantings", Auth, PlantingController.createPlanting);

// Endpoint para excluir uma plantação
PlantingRoutes.delete("/plantings/:id", Auth, PlantingController.deletePlanting);

// Endpoint para alterar uma plantação
PlantingRoutes.put("/plantings/:id", Auth, PlantingController.updatePlanting);

// Endpoint para listar uma única plantação
PlantingRoutes.get("/plantings/:id", Auth, PlantingController.getOnePlanting);

export default PlantingRoutes;
