import express from "express";
const HarvestRoutes = express.Router();
import HarvestController from "../controllers/HarvestController.js";

// Endpoint para listar todas as colheitas
HarvestRoutes.get("/harvests", HarvestController.getAllHarvests);

// Endpoint para cadastrar uma colheita
HarvestRoutes.post("/harvests", HarvestController.createHarvest);

// Endpoint para excluir uma colheita
HarvestRoutes.delete("/harvests/:id", HarvestController.deleteHarvest);

// Endpoint para alterar uma colheita
HarvestRoutes.put("/harvests/:id", HarvestController.updateHarvest);

// Endpoint para listar uma única colheita
HarvestRoutes.get("/harvests/:id", HarvestController.getOneHarvest);

export default HarvestRoutes;
