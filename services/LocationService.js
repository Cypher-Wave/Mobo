import Location from "../models/Location.js";

class LocationService {
  // Função para listar todas as localizações
  async getAll(userSession) {
    try {
      const filter = {
        [userSession.userRole === "family_farmer" ? "user" : "company"]: 
        userSession.userRole === "family_farmer" ? userSession.id : userSession.company
      };
      const locations = await Location.find(filter);
      return locations;
    } catch (error) {
      console.log(error);
    }
  }

  // Função para cadastrar uma localização
  async create(userSession, locationName, longitude, latitude) {
    try {
      const newLocation = new Location({
        locationName,
        longitude,
        latitude,
      });
      if (userSession.userRole === "family_farmer") {
        newLocation.user = userSession.id;
      } else {
        newLocation.company = userSession.company;
      }
      await newLocation.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Função para deletar uma localização
  async delete(id) {
    try {
      await Location.findByIdAndDelete(id);
      console.log(`Localização com a id: ${id} foi excluída.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para atualizar uma localização
  async update(id, locationName, longitude, latitude) {
    try {
      await Location.findByIdAndUpdate(id, {
        locationName,
        longitude,
        latitude,
      });
      console.log(`Localização com a id: ${id} atualizada com sucesso.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Função para listar uma única localização
  async getOne(id) {
    try {
      const location = await Location.findOne({ _id: id });
      return location;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new LocationService();
