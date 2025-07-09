import HarvestService from "../../services/HarvestService.js";
import asyncHandler from "../../utils/asyncHandler.js";

class ReportController {
  renderReports = asyncHandler(async (req, res) => {
    // Delega a lógica de negócio para a camada de serviço
    const user = req.session.user;
    let itemsPerPage = 10;
    const page = parseInt(req.query.page) || 1;
    const { harvests, totalPages, currentPage } = await HarvestService.getPaginated(page, itemsPerPage, user);
    res.render("reports", {
      user,
      harvests,
      currentPage,
      totalPages,
      itemsPerPage,
      pageTitle: "Relatórios",
      cssPage: "reports"
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
