import DashboardService from "../../services/DashboardService.js";
import asyncHandler from "../../utils/asyncHandler.js";

class DashboardController {
  render = asyncHandler(async (req, res) => {
    const userSession = req.session.user;
    const qualityByMonth = await DashboardService.getHarvestQualityByMonth(userSession);
    const harvestThisWeek = await DashboardService.getHarvestThisWeek(userSession);
    const totalHarvestByMonth = await DashboardService.getTotalHarvestByMonth(userSession);
    const growthTrend = await DashboardService.getPlantingGrowthTrend(userSession);
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
