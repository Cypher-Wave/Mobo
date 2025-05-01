import express from "express";
import renderClawArm from "../../controllers/views/ClawArmController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/clawArm", Auth, renderClawArm);

export default router;