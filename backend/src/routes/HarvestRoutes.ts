import { Router } from "express";
import HarvestController from "../controllers/HarvestController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateObjectId } from "../middlewares/validateObjectId";

const router = Router();

router.use(authMiddleware); // Todas as rotas abaixo precisam de token
router.use("/:id", validateObjectId); // Todas as rotas com ID passam pela validação do ObjectId

router.get("/", HarvestController.getAllHarvests);
router.post("/", HarvestController.createHarvest);
router.put("/:id", HarvestController.updateHarvest);
router.delete("/:id", HarvestController.deleteHarvest);
router.get("/:id", HarvestController.getOneHarvest);

export default router;
