import asyncHandler from "../../utils/asyncHandler.js";

class HarvestForecastController {
  render = asyncHandler(async (req, res) => {
    const user = req.session.user;
    res.render("harvestForecast", {
      user,
      pageTitle: "Previsão de Colheita",
      cssPage: "harvestForecast",
    });
  });
}

export default new HarvestForecastController();
