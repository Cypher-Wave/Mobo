import express from "express";
import renderProfile from "../../controllers/views/ProfileController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/profile", renderProfile);

export default router;