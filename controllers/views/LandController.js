import asyncHandler from "../../utils/asyncHandler.js";

class LandController {
  render = asyncHandler(async (req, res) => {
    res.render("land", {
      pageTitle: "Cadastro de Terreno",
      cssPage: "land",
    });
  });
}

export default new LandController();
