import express from "express";
import renderProfile from "../../controllers/views/ProfileController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/profile", Auth, renderProfile);

export default router;