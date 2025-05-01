import asyncHandler from "../../utils/asyncHandler.js";

class HarvestForecastController {
  render = asyncHandler(async (req, res) => {
    res.render("harvestForecast", {
      pageTitle: "Previsão de Colheita",
      cssPage: "harvestForecast",
    });
  });
}

export default new HarvestForecastController();
