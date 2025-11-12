import Sensor, { ISensor } from "../models/Sensor";
import { IUserPayload } from "../utils/jwt";
import {
  checkOwnership,
  ownedFields,
  assignOwnership,
} from "../utils/checkOwnership";

// Interface para entrada dados sobre sensores
export interface SensorInput {
  sensorType: "air_humidity" | "soil_humidity" | "temperature";
  sensorNumeration: string;
  sensorAccuracy: number;
  measuringRange: string;
  setting: ISensor["setting"];
}

// Serviço de Sensores
class SensorService {
  // Função para listar todas os sensores
  async getAll(userSession: IUserPayload): Promise<ISensor[]> {
    const filter =
      userSession.userRole === "family_farmer"
        ? { user: userSession.id }
        : { company: userSession.company! };
    return await Sensor.find(filter);
  }

  // Função para cadastrar um sensor
  async create(userSession: IUserPayload, data: SensorInput): Promise<ISensor> {
    const newSensor = new Sensor(data);
    assignOwnership(userSession, newSensor);
    await newSensor.save();
    return newSensor;
  }

  // Função para atualizar um sensor
  async update(
    id: string,
    userSession: IUserPayload,
    data: SensorInput
  ): Promise<ISensor | null> {
    const sensor = await Sensor.findById(id);
    if (!sensor) throw new Error("Colheita não encontrada");
    checkOwnership(userSession, ownedFields(sensor));
    return await Sensor.findByIdAndUpdate(id, data, { new: true });
  }

  // Função para deletar um sensor
  async delete(id: string, userSession: IUserPayload): Promise<void> {
    const sensor = await Sensor.findById(id);
    if (!sensor) throw new Error("Colheita não encontrada");
    checkOwnership(userSession, ownedFields(sensor));
    await Sensor.findByIdAndDelete(id);
  }

  // Função para listar um único sensor
  async getOne(id: string, userSession: IUserPayload): Promise<ISensor | null> {
    const sensor = await Sensor.findById(id);
    if (!sensor) throw new Error("Colheita não encontrada");
    checkOwnership(userSession, ownedFields(sensor));
    return sensor;
  }
}

export default new SensorService();
