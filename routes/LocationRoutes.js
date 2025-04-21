import express from "express";
const LocationRoutes = express.Router();
import LocationController from "../controllers/LocationController.js";

// Endpoint para listar todas as localizações
LocationRoutes.get("/locations", LocationController.getAllLocations);

// Endpoint para cadastrar uma localização
LocationRoutes.post("/locations", LocationController.createLocation);

// Endpoint para excluir uma localização
LocationRoutes.delete("/locations/:id", LocationController.deleteLocation);

// Endpoint para alterar uma localização
LocationRoutes.put("/locations/:id", LocationController.updateLocation);

// Endpoint para listar uma única localização
LocationRoutes.get("/locations/:id", LocationController.getOneLocation);

export default LocationRoutes;
