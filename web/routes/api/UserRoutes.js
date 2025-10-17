import express from "express";
const UserRoutes = express.Router();
import UserController from "../../controllers/api/UserController.js";
import upload from "../../config/multerUser.js";

// Endpoint para listar todos os usuários
UserRoutes.get("/users", UserController.getAllUsers);

// Endpoint para cadastrar um usuário
UserRoutes.post("/users", upload.single("userImage"), UserController.createUser);

// Endpoint para excluir um usuário
UserRoutes.delete("/users/:id", UserController.deleteUser);

// Endpoint para alterar um usuário
UserRoutes.put("/users/:id", upload.single("userImage"), UserController.updateUser);

// Endpoint para listar um único usuário
UserRoutes.get("/users/:id", UserController.getOneUser);

export default UserRoutes;
