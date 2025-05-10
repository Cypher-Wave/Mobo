import express from "express";
const LocationRoutes = express.Router();
import LocationController from "../../controllers/api/LocationController.js";
import Auth from "../../middleware/Auth.js";

// Endpoint para listar todas as localizações
LocationRoutes.get("/locations", Auth, LocationController.getAllLocations);

// Endpoint para cadastrar uma localização
LocationRoutes.post("/locations", Auth, LocationController.createLocation);

// Endpoint para excluir uma localização
LocationRoutes.delete("/locations/:id", Auth, LocationController.deleteLocation);

// Endpoint para alterar uma localização
LocationRoutes.put("/locations/:id", Auth, LocationController.updateLocation);

// Endpoint para listar uma única localização
LocationRoutes.get("/locations/:id", Auth, LocationController.getOneLocation);

export default LocationRoutes;
