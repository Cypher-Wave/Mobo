import express from "express";
import LandController from "../../controllers/views/LandController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/land", Auth, LandController.render);

export default router;