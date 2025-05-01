import HarvestService from "../../services/HarvestService.js";
import asyncHandler from "../../utils/asyncHandler.js";

class ReportController {
  renderReports = asyncHandler(async (req, res) => {
    // Delega a lógica de negócio para a camada de serviço
    const harvests = await HarvestService.getAll();
    res.render("reports", {
      harvests,
      pageTitle: "Relatórios",
      cssPage: "reports",
    });
  });
}

export default new ReportController();
