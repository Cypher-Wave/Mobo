import HarvestService from "../../services/HarvestService.js";
import asyncHandler from "../../utils/asyncHandler.js";

class ReportController {
  renderReports = asyncHandler(async (req, res) => {
    // Delega a lógica de negócio para a camada de serviço
    const userSession = req.session.user;
    const harvests = await HarvestService.getAll(userSession);
    res.render("reports", {
      harvests,
      pageTitle: "Relatórios",
      cssPage: "reports",
    });
  });

  deleteReports = asyncHandler(async (req, res) => {
    const ids = req.body.selected_id;
    if (!ids) return res.redirect("/reports");
    await HarvestService.deleteMany(ids);
    res.redirect("/reports");
  });
}

export default new ReportController();
