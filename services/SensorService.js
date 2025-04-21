import Sensor from "../models/Sensor.js";

class SensorService {
  // Função para listar todas os sensores
  async getAll() {
    try {
      const sensors = await Sensor.find();
      return sensors;
    } catch (error) {
      console.log(error);
    }
  }

  // Função para cadastrar um sensor
  async create(
    sensorType,
    sensorNumeration,
    sensorAccuracy,
    measuringRange,
    setting
  ) {
    try {
      const newSensor = new Sensor({
        sensorType,
        sensorNumeration,
        sensorAccuracy,
        measuringRange,
        setting,
      });
      await newSensor.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Função para deletar um sensor
  async delete(id) {
    try {
      await Sensor.findByIdAndDelete(id);
      console.log(`Sensor com a id: ${id} foi excluído.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para atualizar um sensor
  async update(
    id,
    sensorType,
    sensorNumeration,
    sensorAccuracy,
    measuringRange,
    setting
  ) {
    try {
      await Sensor.findByIdAndUpdate(id, {
        sensorType,
        sensorNumeration,
        sensorAccuracy,
        measuringRange,
        setting,
      });
      console.log(`Sensor com a id: ${id} atualizado com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para listar um único sensor
  async getOne(id) {
    try {
      const sensor = await Sensor.findOne({ _id: id });
      return sensor;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SensorService();
