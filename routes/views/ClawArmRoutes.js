import express from "express";
import renderClawArm from "../../controllers/views/ClawArmController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/clawArm", renderClawArm);

export default router;