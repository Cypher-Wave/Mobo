import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/logout", authMiddleware, AuthController.logout);

export default router;
