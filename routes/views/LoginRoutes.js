import express from "express";
import LoginController from "../../controllers/views/LoginController.js";
import upload from "../../config/multer.js";

const router = express.Router();

// Rota para o login/cadastro
router.get("/login", LoginController.renderLogin);

// Login 
router.post("/authenticate", upload.single("userImage"), LoginController.login);

// Logout
router.get("/logout", LoginController.logout);

// Cadastro
router.post("/createUser", LoginController.register);

export default router;