import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/logout", authMiddleware, AuthController.logout);

export default router;
