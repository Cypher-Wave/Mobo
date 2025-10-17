import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateObjectId } from "../middlewares/validateObjectId";

const router = Router();

router.use(authMiddleware); // Todas as rotas abaixo precisam de token
router.use("/:id", validateObjectId); // Todas as rotas com ID passam pela validação do ObjectId

router.get("/", UserController.getAllUsers);
// Não possui o create pois está no AuthRouters
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/:id", UserController.getOneUser);

export default router;
