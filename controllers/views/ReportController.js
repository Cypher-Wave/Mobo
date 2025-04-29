import HarvestService from "../../services/HarvestService.js";

const getReports = async (req, res) => {
    try {
      // Delega a lógica de negócio para a camada de serviço
      const harvest = await HarvestService.getAll();
      res.render("reports", {
        harvest,
        pageTitle: "Relatórios",
        cssPage: "reports",
      });
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).render("error", { message: "Erro ao processar relatórios" });
    }
};

export default getReports;