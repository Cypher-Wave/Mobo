import SensorService from "../../services/SensorService.js";
import { ObjectId } from "mongodb";

// Controlador para operações de sensores
// Segue o padrão REST com tratamento centralizado de erros
const getAllSensors = async (req, res) => {
  try {
    // Delega a lógica de negócio para a camada de serviço
    const user = req.session.user;
    const sensors = await SensorService.getAll(user);
    res.status(200).json({ sensors: sensors }); // Padrão de resposta consistente
  } catch (error) {
    console.log("Error in getAllSensors:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const createSensor = async (req, res) => {
  try {
    // Validação implícita via destructuring
    const {
      sensorType,
      sensorNumeration,
      sensorAccuracy,
      measuringRange,
      setting,
    } = req.body;
    const user = req.session.user;
    await SensorService.create(
      sensorType,
      sensorNumeration,
      sensorAccuracy,
      measuringRange,
      setting,
      user
    );
    res.sendStatus(201); // HTTP 201 para criação de recurso
  } catch (error) {
    console.log("Error in createSensor:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const deleteSensor = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await SensorService.delete(id);
      res.sendStatus(204); // HTTP 204 para deleção bem-sucedida
    } else {
      console.log(error);
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in deleteSensor:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const updateSensor = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const {
        sensorType,
        sensorNumeration,
        sensorAccuracy,
        measuringRange,
        setting,
      } = req.body;
      SensorService.update(
        id,
        sensorType,
        sensorNumeration,
        sensorAccuracy,
        measuringRange,
        setting
      );
      res.sendStatus(200); // Ok
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in updateSensor:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const getOneSensor = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const sensor = await SensorService.getOne(id);
      if (!sensor) {
        res.sendStatus(404); // Not Found para usuário não encontrado
      } else {
        res.status(200).json({ sensor }); // Padrão de resposta consistente
      }
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in getOneSensor:", error);
    res.sendStatus(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

export default {
  getAllSensors,
  createSensor,
  deleteSensor,
  updateSensor,
  getOneSensor,
};
