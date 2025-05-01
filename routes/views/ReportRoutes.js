import express from "express";
import renderReports from "../../controllers/views/ReportController.js";
import Auth from "../../middleware/Auth.js";

const router = express.Router();

// Rota para obter alertas
router.get("/reports", Auth, renderReports);

export default router;