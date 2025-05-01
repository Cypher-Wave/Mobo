import express from "express";
import ReportController from "../../controllers/views/ReportController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/reports", Auth, ReportController.renderReports);

export default router;