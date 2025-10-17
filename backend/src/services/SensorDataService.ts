import SensorData, { ISensorData } from "../models/SensorData";
import { IUserPayload } from "../utils/jwt";
import { checkOwnership } from "../utils/checkOwnership";

// Interface para entrada de dados de sensores
export interface SensorDataInput {
  temperature: number;
  soilHumidity: number;
  airHumidity: number;
  alerts?: ISensorData["alerts"];
  sensor: ISensorData["sensor"];
}

// Serviço de Dados de Sensores
class SensorDataService {
  // Função para listar todas os dados de sensores
  async getAll(userSession: IUserPayload): Promise<ISensorData[]> {
    const filter =
      userSession.userRole === "family_farmer"
        ? { user: userSession.id }
        : { company: userSession.company! };
    return await SensorData.find(filter).populate("sensor");
  }

  // Função para cadastrar um dado de sensor
  async create(
    userSession: IUserPayload,
    data: SensorDataInput
  ): Promise<ISensorData> {
    const newSensorData = new SensorData(data);
    await newSensorData.save();
    return newSensorData;
  }

  // Função para atualizar um dado de sensor
  async update(
    id: string,
    userSession: IUserPayload,
    data: SensorDataInput
  ): Promise<ISensorData | null> {
    const sensorData = await SensorData.findById(id).populate("sensor");
    if (!sensorData) throw new Error("Dado de sensor não encontrado");

    const sensor = sensorData.sensor as { user?: string; company?: string };

    checkOwnership(userSession, {
      user: sensor?.user?.toString(),
      company: sensor?.company?.toString(),
    });
    return await SensorData.findByIdAndUpdate(id, data, { new: true });
  }

  // Função para deletar um dado de sensor
  async delete(id: string, userSession: IUserPayload): Promise<void> {
    const sensorData = await SensorData.findById(id).populate("sensor");
    if (!sensorData) throw new Error("Dado de sensor não encontrado");

    const sensor = sensorData.sensor as { user?: string; company?: string };

    checkOwnership(userSession, {
      user: sensor?.user?.toString(),
      company: sensor?.company?.toString(),
    });
    await SensorData.findByIdAndDelete(id);
  }

  // Função para listar um único dado de sensor
  async getOne(
    id: string,
    userSession: IUserPayload
  ): Promise<ISensorData | null> {
    const sensorData = await SensorData.findById(id).populate("sensor");
    if (!sensorData) throw new Error("Dado de sensor não encontrado");

    const sensor = sensorData.sensor as { user?: string; company?: string };

    checkOwnership(userSession, {
      user: sensor?.user?.toString(),
      company: sensor?.company?.toString(),
    });
    return sensorData;
  }
}

export default new SensorDataService();
