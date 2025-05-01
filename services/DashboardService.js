import HarvestService from "./HarvestService.js";

class DashboardService {
  // Qualidade da colheita por mês/ano
  async getHarvestQualityByMonth() {
    try {
      const harvests = await HarvestService.getAll();
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
  async getHarvestThisWeek() {
    try {
      const harvests = await HarvestService.getAll();
      const startOfWeek = dayjs().startOf("week");
      const endOfWeek = dayjs().endOf("week");
      const thisWeekHarvests = harvests.filter((harvest) => {
        const date = dayjs(harvest.harvestDate);
        return date.isAfter(startOfWeek) && date.isBefore(endOfWeek);
      });
      const daily = {};
      thisWeekHarvests.forEach((harvest) => {
        const day = dayjs(harvest.harvestDate).format("dddd"); // Segunda, Terça, etc
        daily[day] = (daily[day] || 0) + harvest.harvestedQuantity;
      });
      return daily;
    } catch (error) {
      console.log(error);
    }
  }
  // Total colhido por mês/ano
  async getTotalHarvestByMonth() {
    try {
      const harvests = await HarvestService.getAll();
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
  async getPlantingGrowthTrend() {
    try {
      const totalByMonth = await this.getTotalHarvestByMonth();
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
