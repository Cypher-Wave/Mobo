import express from "express";
import getReports from "../../controllers/views/ReportController.js";

const router = express.Router();

// Rota para obter alertas
router.get("/reports", getReports);

export default router;