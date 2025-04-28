import SensorData from "../models/SensorData.js";

class SensorDataService {
  // Função para listar todas os dados de sensores
  async getAll() {
    try {
      const sensorDatas = await SensorData.find();
      return sensorDatas;
    } catch (error) {
      console.log(error);
    }
  }

  // Função para cadastrar um dado de sensor
  async create(
    temperature,
    soilHumidity,
    airHumidity,
    alerts,
    location,
    sensor,
  ) {
    try {
      const newSensorData = new SensorData({
        temperature,
        soilHumidity,
        airHumidity,
        alerts,
        location,
        sensor,
      });
      await newSensorData.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Função para deletar um dado de sensor
  async delete(id) {
    try {
      await SensorData.findByIdAndDelete(id);
      console.log(`Dado de Sensor com a id: ${id} foi excluído.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para atualizar um dado de sensor
  async update(
    id,
    temperature,
    soilHumidity,
    airHumidity,
    alerts,
    location,
    sensor
  ) {
    try {
      await SensorData.findByIdAndUpdate(id, {
        temperature,
        soilHumidity,
        airHumidity,
        alerts,
        location,
        sensor,
      });
      console.log(`Dados de Sensor com a id: ${id} atualizados com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para listar um único dado de sensor
  async getOne(id) {
    try {
      const sensorData = await SensorData.findOne({ _id: id });
      return sensorData;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SensorDataService();
