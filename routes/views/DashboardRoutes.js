import express from "express";
import renderDashboard from "../../controllers/views/DashboardController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para as Dashboards
router.get("/dashboard", Auth, renderDashboard);

export default router;