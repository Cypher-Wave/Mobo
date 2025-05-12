import HarvestService from "./HarvestService.js";
import dayjs from "dayjs";

class DashboardService {
  // Qualidade da colheita por mês/ano
  async getHarvestQualityByMonth(userSession) {
    try {
      const harvests = await HarvestService.getAll(userSession);
      const grouped = {};
      harvests.forEach((harvest) => {
        const date = dayjs(harvest.harvestDate);
        const key = `${date.year()}-${date.month() + 1}`; // Ex: "2025-4"
        if (!grouped[key]) {
          grouped[key] = { totalQuality: 0, count: 0 };
        }
        grouped[key].totalQuality += harvest.quality;
        grouped[key].count += 1;
      });
      const result = Object.entries(grouped).map(
        ([period, { totalQuality, count }]) => ({
          period,
          averageQuality: (totalQuality / count).toFixed(2),
        })
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // Colheita da semana por dia
  async getHarvestThisWeek(userSession) {
    try {
      const harvests = await HarvestService.getAll(userSession);
      const today = dayjs();
      const sevenDaysAgo = today.subtract(6, "day");
      // Inicializa objeto com os últimos 7 dias com valor 0
      const daily = {};
      for (let i = 0; i < 7; i++) {
        const date = sevenDaysAgo.add(i, "day");
        const key = date.format("DD/MM");
        daily[key] = 0;
      }
      // Soma colheitas nos respectivos dias
      harvests.forEach((harvest) => {
        const date = dayjs(harvest.harvestDate);
        const key = date.format("DD/MM");
        if (key in daily) {
          daily[key] += harvest.harvestedQuantity;
        }
      });
      // Converte para array de objetos com day e total
      const result = Object.entries(daily).map(([day, total]) => ({
        day,
        total
      }));
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // Total colhido por mês/ano
  async getTotalHarvestByMonth(userSession) {
    try {
      const harvests = await HarvestService.getAll(userSession);
      const grouped = {};
      harvests.forEach((harvest) => {
        const date = dayjs(harvest.harvestDate);
        const key = `${date.year()}-${date.month() + 1}`;
        if (!grouped[key]) {
          grouped[key] = 0;
        }
        grouped[key] += harvest.harvestedQuantity;
      });
      return grouped;
    } catch (error) {
      console.log(error);
    }
  }
  // Tendência de crescimento
  async getPlantingGrowthTrend(userSession) {
    try {
      const totalByMonth = await this.getTotalHarvestByMonth(userSession);
      const months = Object.keys(totalByMonth).sort(); // Organiza cronologicamente
      const trend = months.map((month, index) => {
        if (index === 0) return { month, growth: 0 };
        const prev = totalByMonth[months[index - 1]];
        const current = totalByMonth[month];
        const growth = (((current - prev) / (prev || 1)) * 100).toFixed(2); // Evita divisão por 0
        return { month, growth: Number(growth) };
      });
      return trend;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DashboardService();
