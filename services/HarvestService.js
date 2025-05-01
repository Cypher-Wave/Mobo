import Harvest from "../models/Harvest.js";

class HarvestService {
  // Função para listar todas as colheitas
  async getAll() {
    try {
      const harvests = await Harvest.find().populate("location");
      return harvests;
    } catch (error) {
      console.log(error);
    }
  }

  // Função para cadastrar uma colheita
  async create(
    harvestedQuantity,
    quality,
    harvestDate,
    harvestStart,
    harvestEnd,
    harvestDuration,
    planting,
    location
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
        location,
      });
      await newHarvest.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Função para deletar uma colheita
  async delete(id) {
    try {
      await Harvest.findByIdAndDelete(id);
      console.log(`Colheita com a id: ${id} foi excluída.`);
    } catch (error) {
      console.log(error);
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
    planting,
    location
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
        location,
      });
      console.log(`Colheita com a id: ${id} atualizada com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para listar uma única colheita
  async getOne(id) {
    try {
      const harvest = await Harvest.findOne({ _id: id });
      return harvest;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new HarvestService();
