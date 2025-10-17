import DashboardService from "../services/DashboardService.js";
import HarvestService from "../services/HarvestService.js";
import asyncHandler from "../utils/asyncHandler.js";

class DashboardController {
  render = asyncHandler(async (req, res) => {
    const user = req.session.user;
    const qualityByMonth = await DashboardService.getHarvestQualityByMonth(user);
    const harvestThisWeek = await DashboardService.getHarvestThisWeek(user);
    const totalHarvestByMonth = await DashboardService.getTotalHarvestByMonth(user);
    const growthTrend = await DashboardService.getPlantingGrowthTrend(user);
    const harvests = await HarvestService.getAll(user);
    const top5Harvests = harvests.slice(0, 5);
    res.render("dashboard", {
      user,
      harvests: top5Harvests,
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
