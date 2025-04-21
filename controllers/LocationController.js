import LocationService from "../services/LocationService.js";
import { ObjectId } from "mongodb";

// Controlador para operações de localizações
// Segue o padrão REST com tratamento centralizado de erros
const getAllLocations = async (req, res) => {
  try {
    // Delega a lógica de negócio para a camada de serviço
    const locations = await LocationService.getAll();
    res.status(200).json({ locations: locations }); // Padrão de resposta consistente
  } catch (error) {
    console.log("Error in getAllLocations:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const createLocation = async (req, res) => {
  try {
    // Validação implícita via destructuring
    const { locationName, longitude, latitude } = req.body;
    await LocationService.create(locationName, longitude, latitude);
    res.sendStatus(201); // HTTP 201 para criação de recurso
  } catch (error) {
    console.log("Error in createLocation:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const deleteLocation = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await LocationService.delete(id);
      res.sendStatus(204); // HTTP 204 para deleção bem-sucedida
    } else {
      console.log(error);
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in deleteLocation:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const updateLocation = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { locationName, longitude, latitude } = req.body;
      LocationService.update(id, locationName, longitude, latitude);
      res.sendStatus(200); // Ok
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in updateLocation:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const getOneLocation = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const location = await LocationService.getOne(id);
      if (!location) {
        res.sendStatus(404); // Not Found para usuário não encontrado
      } else {
        res.status(200).json({ location }); // Padrão de resposta consistente
      }
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in getOneLocation:", error);
    res.sendStatus(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

export default {
  getAllLocations,
  createLocation,
  deleteLocation,
  updateLocation,
  getOneLocation,
};
