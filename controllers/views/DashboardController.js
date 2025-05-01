import DashboardService from "../../services/DashboardService.js";
import asyncHandler from "../../utils/asyncHandler.js";

class DashboardController {
  render = asyncHandler(async (req, res) => {
    const qualityByMonth = await DashboardService.getHarvestQualityByMonth();
    const harvestThisWeek = await DashboardService.getHarvestThisWeek();
    const totalHarvestByMonth = await DashboardService.getTotalHarvestByMonth();
    const growthTrend = await DashboardService.getPlantingGrowthTrend();
    res.render("dashboard", {
      qualityByMonth,
      harvestThisWeek,
      totalHarvestByMonth,
      growthTrend,
      pageTitle: "Dashboard",
      cssPage: "dashboard",
    });
  });
}

export default new DashboardController();
