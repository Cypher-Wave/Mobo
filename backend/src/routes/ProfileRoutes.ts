import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use("/", authMiddleware);

router.get("/", ProfileController.getUserImage);
router.post("/", ProfileController.uploadImage);

export default router;