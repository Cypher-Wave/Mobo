import Planting, { IPlanting } from "../models/Planting";
import { IUserPayload } from "../utils/jwt";
import {
  checkOwnership,
  ownedFields,
  assignOwnership,
} from "../utils/checkOwnership";

// Interface para entrada de dados de plantação
export interface PlantingInput {
  plantingName: string;
  plantingDate: Date;
  plantedArea: number;
  location: string;
}

// Serviço de Plantio
class PlantingService {
  // Listar todas as plantações
  async getAll(userSession: IUserPayload): Promise<IPlanting[]> {
    const filter =
      userSession.userRole === "family_farmer"
        ? { user: userSession.id }
        : { company: userSession.company };
    return Planting.find(filter);
  }

  // Criar plantação
  async create(
    userSession: IUserPayload,
    data: PlantingInput
  ): Promise<IPlanting> {
    const newPlanting = new Planting(data);
    assignOwnership(userSession, newPlanting);
    await newPlanting.save();
    return newPlanting;
  }

  // Atualizar plantação
  async update(
    id: string,
    userSession: IUserPayload,
    data: PlantingInput
  ): Promise<IPlanting | null> {
    const planting = await Planting.findById(id);
    if (!planting) throw new Error("Pomar não encontrado");

    checkOwnership(userSession, ownedFields(planting));
    return await Planting.findByIdAndUpdate(id, data, { new: true });
  }

  // Deletar uma plantação
  async delete(id: string, userSession: IUserPayload): Promise<void> {
    const planting = await Planting.findById(id);
    if (!planting) throw new Error("Pomar não encontrado");

    checkOwnership(userSession, ownedFields(planting));
    await Planting.findByIdAndDelete(id);
  }

  // Buscar uma plantação específica
  async getOne(
    id: string,
    userSession: IUserPayload
  ): Promise<IPlanting | null> {
    const planting = await Planting.findById(id);
    if (!planting) throw new Error("Pomar não encontrado");

    checkOwnership(userSession, ownedFields(planting));
    return planting;
  }
}

export default new PlantingService();
