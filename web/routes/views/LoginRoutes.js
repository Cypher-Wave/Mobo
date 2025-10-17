import express from "express";
import LoginController from "../../controllers/views/LoginController.js";
import upload from "../../config/multerUser.js";

const router = express.Router();

// Rota para o login/cadastro
router.get("/login", LoginController.render);

// Login 
router.post("/authenticate", LoginController.authenticate);

// Logout
router.get("/logout", LoginController.logout);

// Cadastro
router.post("/createUser", upload.single("userImage"), LoginController.register);

export default router;