import express from "express";
import renderLand from "../../controllers/views/LandController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/land", Auth, renderLand);

export default router;