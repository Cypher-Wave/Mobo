import Harvest, { IHarvest } from "../models/Harvest";
import { IUserPayload } from "../utils/jwt";
import { paginate, PaginateResult } from "../utils/paginate";
import {
  checkOwnership,
  ownedFields,
  assignOwnership,
} from "../utils/checkOwnership";

// Interface para entrada de dados de colheita
export interface HarvestInput {
  harvestedQuantity: number;
  quality: number;
  harvestDate: Date;
  harvestStart: Date;
  harvestEnd: Date;
  harvestDuration: number;
  planting: string;
}

// Serviço de Colheita
class HarvestService {
  // Método que checa se os dados estão sendo preenchidos corretamente
  private checkHarvestIntegrity(data: HarvestInput): void {
    if (data.harvestedQuantity <= 0) {
      throw new Error("A quantidade colhida deve ser maior que zero.");
    }
    if (data.harvestEnd < data.harvestStart) {
      throw new Error(
        "A data final da colheita não pode ser anterior ao início."
      );
    }
  }

  // Lista Todas as Colheitas
  async getAll(userSession: IUserPayload) {
    const filter =
      userSession.userRole === "family_farmer"
        ? { user: userSession.id }
        : { company: userSession.company! };
    return await Harvest.find(filter).populate("planting");
  }

  // Listar todas as colheitas Paginadas
  async getPaginated(
    userSession: IUserPayload,
    page: number,
    limit: number
  ): Promise<PaginateResult<IHarvest>> {
    if (page < 1) page = 1;
    if (limit > 20) limit = 20;

    const filter =
      userSession.userRole === "family_farmer"
        ? { user: userSession.id }
        : { company: userSession.company! };
    return await paginate(Harvest, filter, page, limit, { harvestDate: -1 }, ["planting"]);
  }

  // Criar colheita
  async create(
    userSession: IUserPayload,
    data: HarvestInput
  ): Promise<IHarvest> {
    this.checkHarvestIntegrity(data);
    const newHarvest = new Harvest(data);
    assignOwnership(userSession, newHarvest);
    await newHarvest.save();
    return newHarvest;
  }

  // Atualizar colheita
  async update(
    id: string,
    userSession: IUserPayload,
    data: HarvestInput
  ): Promise<IHarvest | null> {
    const harvest = await Harvest.findById(id);
    if (!harvest) throw new Error("Colheita não encontrada");

    checkOwnership(userSession, ownedFields(harvest));
    this.checkHarvestIntegrity(data);
    return await Harvest.findByIdAndUpdate(id, data, { new: true });
  }

  // Deletar várias colheitas
  async deleteMany(userSession: IUserPayload, ids: string[]): Promise<void> {
    const idsArray = Array.isArray(ids) ? ids : [ids];
    const harvests = await Harvest.find({ _id: { $in: idsArray } });
    if (harvests.length === 0) throw new Error("Nenhuma colheita encontrada.");

    for (const harvest of harvests) {
      checkOwnership(userSession, ownedFields(harvest));
    }
    await Harvest.deleteMany({ _id: { $in: idsArray } });
  }

  // Buscar uma colheita específica
  async getOne(
    id: string,
    userSession: IUserPayload
  ): Promise<IHarvest | null> {
    const harvest = await Harvest.findById(id).populate("planting");
    if (!harvest) throw new Error("Colheita não encontrada");

    checkOwnership(userSession, ownedFields(harvest));
    return harvest;
  }
}

export default new HarvestService();
