import express from "express";
const HarvestRoutes = express.Router();
import HarvestController from "../../controllers/api/HarvestController.js";

// Endpoint para listar todas as colheitas
HarvestRoutes.get("/harvest", HarvestController.getAllHarvests);

// Endpoint para cadastrar uma colheita
HarvestRoutes.post("/harvest", HarvestController.createHarvest);

// Endpoint para excluir uma colheita
HarvestRoutes.delete("/harvest/:id", HarvestController.deleteHarvest);

// Endpoint para alterar uma colheita
HarvestRoutes.put("/harvest/:id", HarvestController.updateHarvest);

// Endpoint para listar uma única colheita
HarvestRoutes.get("/harvest/:id", HarvestController.getOneHarvest);

export default HarvestRoutes;
