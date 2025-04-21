import PlantingService from "../services/PlantingService.js";
import { ObjectId } from "mongodb";

// Controlador para operações de plantações
// Segue o padrão REST com tratamento centralizado de erros
const getAllPlantings = async (req, res) => {
  try {
    // Delega a lógica de negócio para a camada de serviço
    const plantings = await PlantingService.getAll();
    res.status(200).json({ plantings: plantings }); // Padrão de resposta consistente
  } catch (error) {
    console.log("Error in getAllPlantings:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const createPlanting = async (req, res) => {
  try {
    // Validação implícita via destructuring
    const { plantingName, plantingDate, plantedArea, location, company } =
      req.body;
    await PlantingService.create(
      plantingName,
      plantingDate,
      plantedArea,
      location,
      company
    );
    res.sendStatus(201); // HTTP 201 para criação de recurso
  } catch (error) {
    console.log("Error in createPlanting:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const deletePlanting = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await PlantingService.delete(id);
      res.sendStatus(204); // HTTP 204 para deleção bem-sucedida
    } else {
      console.log(error);
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in deletePlanting:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const updatePlanting = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { plantingName, plantingDate, plantedArea, location, company } =
        req.body;
      PlantingService.update(
        id,
        plantingName,
        plantingDate,
        plantedArea,
        location,
        company
      );
      res.sendStatus(200); // Ok
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in updatePlanting:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const getOnePlanting = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const planting = await PlantingService.getOne(id);
      if (!planting) {
        res.sendStatus(404); // Not Found para usuário não encontrado
      } else {
        res.status(200).json({ planting }); // Padrão de resposta consistente
      }
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in getOnePlanting:", error);
    res.sendStatus(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

export default {
  getAllPlantings,
  createPlanting,
  deletePlanting,
  updatePlanting,
  getOnePlanting,
};
