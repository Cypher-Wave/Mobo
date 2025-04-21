import express from "express";
const UserRoutes = express.Router();
import UserController from "../controllers/UserController.js";

// Endpoint para listar todos os usuários
UserRoutes.get("/users", UserController.getAllUsers);

// Endpoint para cadastrar um usuário
UserRoutes.post("/users", UserController.createUser);

// Endpoint para excluir um usuário
UserRoutes.delete("/users/:id", UserController.deleteUser);

// Endpoint para alterar um usuário
UserRoutes.put("/users/:id", UserController.updateUser);

// Endpoint para listar um único usuário
UserRoutes.get("/users/:id", UserController.getOneUser);

export default UserRoutes;
