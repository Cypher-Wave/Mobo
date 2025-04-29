import SensorService from "../../services/SensorService.js";
import SensorDataService from "../../services/SensorDataService.js";

const renderSensors = async (req, res) => {
    try {
        const sensors = await SensorService.getAll();
        const sensorsData = await SensorDataService.getAll();
        res.render("sensors", {
            sensors,
            sensorsData,
            pageTitle: "Sensores",
            cssPage: "sensors",
          });
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).render("error", { message: "Erro ao processar sensores" });
    }
}

export default renderSensors;