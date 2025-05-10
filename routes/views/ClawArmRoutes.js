import express from "express";
import ClawArmController from "../../controllers/views/ClawArmController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/clawArm", Auth, ClawArmController.render);

export default router;