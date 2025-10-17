import HarvestImage, { IHarvestImage } from "../models/HarvestImage";

// Resultado do upload de imagem
interface UploadImageResult {
  success: boolean;
  image?: IHarvestImage;
  message?: string;
}

// Serviço de Perfil
class ProfileService {
  // Upload de imagem
  async uploadImage(
    userId: string,
    imageName: string
  ): Promise<UploadImageResult> {
    try {
      const newImage = new HarvestImage({ user: userId, imageName });
      await newImage.save();
      return { success: true, image: newImage };
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
      return { success: false, message: "Erro ao salvar imagem" };
    }
  }

  // Buscar imagens do usuário
  async getUserImages(userId: string) {
    try {
      const images = await HarvestImage.find({ user: userId })
        .sort({ createdAt: -1 })
        .lean();
      return images;
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      return [];
    }
  }
}

export default new ProfileService();
