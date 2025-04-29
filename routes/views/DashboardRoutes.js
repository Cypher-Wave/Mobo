import express from "express";
import renderDashboard from "../../controllers/views/DashboardController.js";

const router = express.Router();

// Rota para as Dashboards
router.get("/dashboard", renderDashboard);

export default router;