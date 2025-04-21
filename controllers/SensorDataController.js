import SensorDataService from "../services/SensorDataService.js";
import { ObjectId } from "mongodb";

// Controlador para operações de dados de sensores
// Segue o padrão REST com tratamento centralizado de erros
const getAllSensorDatas = async (req, res) => {
  try {
    // Delega a lógica de negócio para a camada de serviço
    const sensorDatas = await SensorDataService.getAll();
    res.status(200).json({ sensorDatas: sensorDatas }); // Padrão de resposta consistente
  } catch (error) {
    console.log("Error in getAllSensorDatas:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const createSensorData = async (req, res) => {
  try {
    // Validação implícita via destructuring
    const {
      temperature,
      soilHumidity,
      airHumidity,
      alertActive,
      location,
      sensor,
    } = req.body;
    await SensorDataService.create(
      temperature,
      soilHumidity,
      airHumidity,
      alertActive,
      location,
      sensor
    );
    res.sendStatus(201); // HTTP 201 para criação de recurso
  } catch (error) {
    console.log("Error in createSensorData:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const deleteSensorData = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await SensorDataService.delete(id);
      res.sendStatus(204); // HTTP 204 para deleção bem-sucedida
    } else {
      console.log(error);
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in deleteSensorData:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const updateSensorData = async (req, res) => {
  try {
    // Validar ObjectId antes de processar
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const {
        temperature,
        soilHumidity,
        airHumidity,
        alertActive,
        location,
        sensor,
      } = req.body;
      SensorDataService.update(
        id,
        temperature,
        soilHumidity,
        airHumidity,
        alertActive,
        location,
        sensor
      );
      res.sendStatus(200); // Ok
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in updateSensorData:", error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

const getOneSensorData = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const sensorData = await SensorDataService.getOne(id);
      if (!sensorData) {
        res.sendStatus(404); // Not Found para usuário não encontrado
      } else {
        res.status(200).json({ sensorData }); // Padrão de resposta consistente
      }
    } else {
      res.sendStatus(400); // Bad Request para IDs inválidos
    }
  } catch (error) {
    console.log("Error in getOneSensorData:", error);
    res.sendStatus(500).json({ error: "Erro interno do servidor." }); // Mensagem genérica por segurança
  }
};

export default {
  getAllSensorDatas,
  createSensorData,
  deleteSensorData,
  updateSensorData,
  getOneSensorData,
};
