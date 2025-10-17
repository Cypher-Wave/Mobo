import express from "express";
import ReportController from "../../controllers/views/ReportController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter relatórios
router.get("/reports", Auth, ReportController.renderReports);

// Rota para excluir relatórios
router.post("/reports/delete", Auth, ReportController.deleteReports);

export default router;