import express from "express";
import ProfileController from "../../controllers/views/ProfileController.js";
import Auth from "../../middleware/Auth.js";
import upload from "../../config/multerHarvest.js"

const router = express.Router();

// Rota para obter alertas
router.get("/profile", Auth, ProfileController.render);

// Rota para envio da imagem
router.post("/profile/upload", Auth, upload.single("harvestImage"), ProfileController.uploadImage);

export default router;