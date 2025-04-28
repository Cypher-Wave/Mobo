import AlertService from "../../services/AlertService.js";

// Controlador para obter alertas
const getAlerts = async (req, res) => {
  try {
    // Verifica os alertas
    await AlertService.checkAlerts();
    // Obtém os sensores com alertas ativos
    const sensorsWithAlerts = await AlertService.getSensorsWithAlerts();
    // Renderiza a view
    res.render("alerts", {
      sensors: sensorsWithAlerts,
      pageTitle: "Alertas",
      cssPage: "alerts",
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).render("error", { message: "Erro ao processar alertas" });
  }
};

export default getAlerts;
