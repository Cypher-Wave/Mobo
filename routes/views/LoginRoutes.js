import express from "express";
import renderLogin from "../../controllers/views/LoginController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/login", renderLogin);

export default router;