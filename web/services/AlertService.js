import SensorData from "../models/SensorData.js";

class AlertService {
  // Função para verificar os alertas
  async checkAlerts() {
    const sensors = await SensorData.find();
    const updatedSensors = [];
    for (const sensor of sensors) {
      const newAlerts = [];
      if (sensor.temperature > 30) {
        newAlerts.push({
          type: "high_temp",
          value: sensor.temperature,
          threshold: 30,
          isActive: true,
        });
      }
      if (sensor.humidity > 80) {
        newAlerts.push({
          type: "high_humidity",
          value: sensor.humidity,
          threshold: 80,
          isActive: true,
        });
      }
      if (newAlerts.length > 0) {
        await SensorData.updateOne(
          { _id: sensor._id },
          { $push: { alerts: { $each: newAlerts } } }
        );
        updatedSensors.push(sensor);
      }
    }
    return updatedSensors;
  }

  async getSensorsWithAlerts() {
    return await SensorData.find({
      "alerts.isActive": true,
    });
  }
}

export default new AlertService();
