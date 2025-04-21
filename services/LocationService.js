import Location from "../models/Location.js";

class LocationService {
  // Função para listar todas as localizações
  async getAll() {
    try {
      const locations = await Location.find();
      return locations;
    } catch (error) {
      console.log(error);
    }
  }

  // Função para cadastrar uma localização
  async create(locationName, longitude, latitude) {
    try {
      const newLocation = new Location({
        locationName,
        longitude,
        latitude,
      });
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
