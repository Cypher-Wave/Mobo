import express from "express";
import renderReports from "../../controllers/views/ReportController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/reports", renderReports);

export default router;