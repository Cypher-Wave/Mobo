import dayjs from "dayjs";
import ProfileService from "../../services/ProfileService.js";
import asyncHandler from "../../utils/asyncHandler.js";

class ProfileController {
  uploadImage = asyncHandler(async (req, res) => {
    const userId = req.body.userId || req.user.id;
    const imageName = req.file.filename;

    const result = await ProfileService.uploadImage(userId, imageName);
    if (result.success) {
      res.redirect("/profile");
    } else {
      res.render("error", { message: result.message });
    }
  });

  render = asyncHandler(async (req, res) => {
    const user = req.session.user;
    const userId = req.params.userId || req.user.id;
    const images = await ProfileService.getUserImages(userId);

    // Ordenar por data (se tiver `createdAt`) e pegar as últimas 8
    // const images = allImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

    res.render("profile", {
      user,
      images,
      dayjs,
      pageTitle: "Perfil",
      cssPage: "profile",
    });
  });
}

export default new ProfileController();
