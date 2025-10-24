import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateObjectId } from "../middlewares/validateObjectId";

const router = Router();

router.use(authMiddleware); // Todas as rotas abaixo precisam de token

router.get("/", UserController.getAllUsers);
// Não possui o create pois está no AuthRouters
router.put("/:id", validateObjectId, UserController.updateUser);
router.delete("/:id", validateObjectId, UserController.deleteUser);
router.get("/me", UserController.getUser);

export default router;
