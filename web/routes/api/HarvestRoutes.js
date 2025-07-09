import express from "express";
const HarvestRoutes = express.Router();
import HarvestController from "../../controllers/api/HarvestController.js";
import Auth from "../../middleware/Auth.js";

// Endpoint para listar todas as colheitas
HarvestRoutes.get("/harvest", Auth, HarvestController.getAllHarvests);

// Endpoint para cadastrar uma colheita
HarvestRoutes.post("/harvest", Auth, HarvestController.createHarvest);

// Endpoint para excluir uma colheita
HarvestRoutes.delete("/harvest/:id", Auth, HarvestController.deleteHarvest);

// Endpoint para alterar uma colheita
HarvestRoutes.put("/harvest/:id", Auth, HarvestController.updateHarvest);

// Endpoint para listar uma única colheita
HarvestRoutes.get("/harvest/:id", Auth, HarvestController.getOneHarvest);

export default HarvestRoutes;
