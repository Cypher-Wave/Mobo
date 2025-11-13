import { Router } from "express";
import SensorDataController from "../controllers/SensorDataController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateObjectId } from "../middlewares/validateObjectId";

const router = Router();

router.use(authMiddleware); // Todas as rotas abaixo precisam de token
router.use("/:id", validateObjectId); // Todas as rotas com ID passam pela validação do ObjectId

router.get("/", SensorDataController.getAllSensorDatas);
router.post("/", SensorDataController.createSensorData);
router.put("/:id", SensorDataController.updateSensorData);
router.delete("/:id", SensorDataController.deleteSensorData);
router.get("/:id", SensorDataController.getOneSensorData);

export default router;