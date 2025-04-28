import UserService from "../../services/UserService.js";
import { ObjectId } from "mongodb";

// Controlador para operações de usuário
// Segue o padrão REST com tratamento centralizado de erros
const getAllUsers = async (req, res) => {
  try {
    // Delega a lógica de negócio para a camada de serviço
    const companyId = req.params.companyId;
    const users = await UserService.getAll(companyId);
    res.status(200).json({ users: users }); // Padrão de resposta consistente
  } catch (error) {
    console.log("Error in getAllUsers:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const createUser = async (req, res) => {
  try {
    // Validação implícita via destructuring
    const {
      userName,
      userEmail,
      userPassword,
      userPhone,
      userRole,
      company,
      farmerDetails,
    } = req.body;
    await UserService.create(
      userName,
      userEmail,
      userPassword,
      userPhone,
      userRole,
      company,
      farmerDetails
    );
    res.sendStatus(201); // HTTP 201 para criação de recurso
  } catch (error) {
    console.log("Error in createUser:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const deleteUser = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await UserService.delete(id);
      res.sendStatus(204); // HTTP 204 para deleção bem-sucedida
    } else {
      console.log(error);
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in deleteUser:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const updateUser = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const {
        userName,
        userEmail,
        userPassword,
        userPhone,
        userRole,
        company,
        farmerDetails,
      } = req.body;
      UserService.update(
        id,
        userName,
        userEmail,
        userPassword,
        userPhone,
        userRole,
        company,
        farmerDetails
      );
      res.sendStatus(200); // Ok
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in updateUser:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const getOneUser = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const user = await UserService.getOne(id);
      if (!user) {
        res.sendStatus(404); // Not Found para usuário não encontrado
      } else {
        res.status(200).json({ user }); // Padrão de resposta consistente
      }
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in getOneUser:", error);
    res.sendStatus(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

export default { getAllUsers, createUser, deleteUser, updateUser, getOneUser };
