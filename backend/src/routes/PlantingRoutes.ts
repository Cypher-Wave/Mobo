import { Router } from "express";
import PlantingController from "../controllers/PlantingController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateObjectId } from "../middlewares/validateObjectId";

const router = Router();

router.use(authMiddleware);
router.use("/:id", validateObjectId);

router.get("/", PlantingController.getAllPlantings);
router.post("/", PlantingController.createPlanting);
router.put("/:id", PlantingController.updatePlanting);
router.delete("/:id", PlantingController.deletePlanting);
router.get("/:id", PlantingController.getOnePlanting);

export default router;