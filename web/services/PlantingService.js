import Planting from "../models/Planting.js";

class PlantingService {
  // Função para listar todas as plantações
  async getAll() {
    try {
      const filter = {
        [userSession.userRole === "family_farmer" ? "user" : "company"]: 
        userSession.userRole === "family_farmer" ? userSession.id : userSession.company
      };
      const plantings = await Planting.find(filter);
      return plantings;
    } catch (error) {
      console.log(error);
    }
  }

  // Função para cadastrar uma plantação
  async create(userSession, plantingName, plantingDate, plantedArea, location) {
    try {
      const newPlanting = new Planting({
        plantingName,
        plantingDate,
        plantedArea,
        location,
      });
      if (userSession.userRole === "family_farmer") {
        newPlanting.user = userSession.id;
      } else {
        newPlanting.company = userSession.company;
      }
      await newPlanting.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Função para deletar uma plantação
  async delete(id) {
    try {
      await Planting.findByIdAndDelete(id);
      console.log(`Plantação com a id: ${id} foi excluída.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para atualizar uma plantação
  async update(id, plantingName, plantingDate, plantedArea, location, company) {
    try {
      await Planting.findByIdAndUpdate(id, {
        plantingName,
        plantingDate,
        plantedArea,
        location,
        company,
      });
      console.log(`Plantação com a id: ${id} atualizada com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para listar uma única plantação
  async getOne(id) {
    try {
      const planting = await Planting.findOne({ _id: id });
      return planting;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PlantingService();
