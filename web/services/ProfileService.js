import HarvestImage from "../models/HarvestImage.js";

class ProfileService {
  async uploadImage(userId, imageName) {
    try {
      const newImage = new HarvestImage({ user: userId, imageName });
      await newImage.save();
      return { success: true, image: newImage };
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
      return { success: false, message: "Erro ao salvar imagem" };
    }
  }

  async getUserImages(userId) {
    try {
      const images = await HarvestImage.find({ user: userId }).sort({ createdAt: -1 }).lean();
      return images;
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      return [];
    }
  }
}

export default new ProfileService();
