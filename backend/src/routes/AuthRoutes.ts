import { Router } from "express";
import upload from "../config/multer"
import AuthController from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", upload.single("userImage"), AuthController.register);
router.get("/logout", authMiddleware, AuthController.logout);

export default router;
