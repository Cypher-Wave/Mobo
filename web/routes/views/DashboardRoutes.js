import express from "express";
import DashboardController from "../../controllers/views/DashboardController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para as Dashboards
router.get("/dashboard", Auth, DashboardController.render);

export default router;