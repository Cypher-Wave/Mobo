import SensorService from "../../services/SensorService.js";
import SensorDataService from "../../services/SensorDataService.js";
import asyncHandler from "../../utils/asyncHandler.js";

class SensorsController {
  renderSensors = asyncHandler(async (req, res) => {
    const userSession = req.session.user;
    const sensors = await SensorService.getAll(userSession);
    const sensorsData = await SensorDataService.getAll();
    res.render("sensors", {
      sensors,
      sensorsData,
      pageTitle: "Sensores",
      cssPage: "sensors",
    });
  });
}

export default new SensorsController();
