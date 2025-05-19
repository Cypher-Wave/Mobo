import AlertService from "../../services/AlertService.js";
import asyncHandler from "../../utils/asyncHandler.js";

// Controlador para obter alertas
class AlertController {
  render = asyncHandler(async (req, res) => {
    const user = req.session.user;
    // Verifica os alertas
    await AlertService.checkAlerts();
    // Obtém os sensores com alertas ativos
    const sensorsWithAlerts = await AlertService.getSensorsWithAlerts();
    // Renderiza a view
    res.render("alerts", {
      user,
      sensors: sensorsWithAlerts,
      pageTitle: "Alertas",
      cssPage: "alerts",
    });
  });
}

export default new AlertController();
