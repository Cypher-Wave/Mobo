import Harvest from "../models/Harvest.js";

class HarvestService {
  // Função para listar todas as colheitas
  async getAll(userSession) {
    try {
      const filter = {
        ...(userSession.userRole === "family_farmer"
          ? { user: userSession.id }
          : { company: userSession.company }),
      };
      const harvests = await Harvest.find(filter).populate("planting");
      return harvests;
    } catch (error) {
      console.error(error);
    }
  }

  // Função para cadastrar uma colheita
  async create(
    userSession,
    harvestedQuantity,
    quality,
    harvestDate,
    harvestStart,
    harvestEnd,
    harvestDuration,
    planting
  ) {
    try {
      const newHarvest = new Harvest({
        harvestedQuantity,
        quality,
        harvestDate,
        harvestStart,
        harvestEnd,
        harvestDuration,
        planting,
      });
      if (userSession.userRole === "family_farmer") {
        newHarvest.user = userSession.id;
      } else {
        newHarvest.company = userSession.company;
      }
      await newHarvest.save();
    } catch (error) {
      console.error(error);
    }
  }

  // Função para deletar uma colheita
  async delete(id) {
    try {
      await Harvest.findByIdAndDelete(id);
      console.log(`Colheita com a id: ${id} foi excluída.`);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteMany(ids) {
    try {
      const idsArray = Array.isArray(ids) ? ids : [ids];
      await Harvest.deleteMany({ _id: { $in: idsArray } });
    } catch (error) {
      console.error(error);
    }
  }

  // Função para atualizar uma colheita
  async update(
    id,
    harvestedQuantity,
    quality,
    harvestDate,
    harvestStart,
    harvestEnd,
    harvestDuration,
    planting
  ) {
    try {
      await Harvest.findByIdAndUpdate(id, {
        harvestedQuantity,
        quality,
        harvestDate,
        harvestStart,
        harvestEnd,
        harvestDuration,
        planting,
      });
      console.log(`Colheita com a id: ${id} atualizada com sucesso.`);
    } catch (error) {
      console.error(error);
    }
  }

  // Função para listar uma única colheita
  async getOne(id) {
    try {
      const harvest = await Harvest.findOne({ _id: id });
      return harvest;
    } catch (error) {
      console.error(error);
    }
  }

  async getPaginated(page, limit, userSession) {
    try {
      const filter = {
        ...(userSession.userRole === "family_farmer"
          ? { user: userSession.id }
          : { company: userSession.company }),
      };
      const total = await Harvest.countDocuments(filter);
      const harvests = await Harvest.find(filter)
        .populate("planting")
        .sort({ harvestDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      return {
        harvests,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error(error);
    }
  }
}

export default new HarvestService();