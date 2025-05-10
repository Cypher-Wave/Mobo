import HarvestService from "../../services/HarvestService.js";
import { ObjectId } from "mongodb";

// Controlador para operações de colheitas
// Segue o padrão REST com tratamento centralizado de erros
const getAllHarvests = async (req, res) => {
  try {
    // Delega a lógica de negócio para a camada de serviço
    const userSession = req.session.user;
    const harvests = await HarvestService.getAll(userSession);
    res.status(200).json({ harvests: harvests }); // Padrão de resposta consistente
  } catch (error) {
    console.log("Error in getAllHarvests:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const createHarvest = async (req, res) => {
  try {
    // Validação implícita via destructuring
    const {
      harvestedQuantity,
      quality,
      harvestDate,
      harvestStart,
      harvestEnd,
      harvestDuration,
      planting,
      location,
    } = req.body;
    const userSession = req.session.user;
    await HarvestService.create(
      harvestedQuantity,
      quality,
      harvestDate,
      harvestStart,
      harvestEnd,
      harvestDuration,
      planting,
      location,
      userSession
    );
    res.sendStatus(201); // HTTP 201 para criação de recurso
  } catch (error) {
    console.log("Error in createHarvest:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const deleteHarvest = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await HarvestService.delete(id);
      res.sendStatus(204); // HTTP 204 para deleção bem-sucedida
    } else {
      console.log(error);
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in deleteHarvest:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const updateHarvest = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const {
        harvestedQuantity,
        quality,
        harvestDate,
        harvestStart,
        harvestEnd,
        harvestDuration,
        planting,
        location,
      } = req.body;
      HarvestService.update(
        id,
        harvestedQuantity,
        quality,
        harvestDate,
        harvestStart,
        harvestEnd,
        harvestDuration,
        planting,
        location
      );
      res.sendStatus(200); // Ok
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in updateHarvest:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const getOneHarvest = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const harvest = await HarvestService.getOne(id);
      if (!harvest) {
        res.sendStatus(404); // Not Found para usuário não encontrado
      } else {
        res.status(200).json({ harvest }); // Padrão de resposta consistente
      }
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in getOneHarvest:", error);
    res.sendStatus(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

export default {
  getAllHarvests,
  createHarvest,
  deleteHarvest,
  updateHarvest,
  getOneHarvest,
};
