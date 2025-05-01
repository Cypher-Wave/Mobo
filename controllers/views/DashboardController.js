import DashboardService from "../../services/DashboardService.js";

async function renderDashboard(req, res) {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao carregar a dashboard.");
  }
}

export default renderDashboard;
