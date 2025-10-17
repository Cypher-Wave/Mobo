import asyncHandler from "../utils/asyncHandler.js";

class LandController {
  render = asyncHandler(async (req, res) => {
    const user = req.session.user;
    res.render("land", {
      user,
      pageTitle: "Cadastro de Terreno",
      cssPage: "land",
    });
  });
}

export default new LandController();
