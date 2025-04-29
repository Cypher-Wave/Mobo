import express from "express";
import LoginController from "../../controllers/views/LoginController.js";
import upload from "../../config/multer.js";

const router = express.Router();

// Rota para obter alertas
router.get("/login", upload.single("userImage"), LoginController.renderLogin, LoginController.registerUser, LoginController.loginUser);

export default router;