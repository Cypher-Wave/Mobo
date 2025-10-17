import dayjs from "dayjs";
import { IHarvest } from "../models/Harvest";
import HarvestService from "./HarvestService";
import { IUserPayload } from "../utils/jwt";

// Tipos para os dados do dashboard
interface HarvestQualityByMonth {
  period: string;
  averageQuality: string;
}

// Tipo para colheitas por dia na semana
interface HarvestByDay {
  day: string;
  total: number;
}

// Tipo para tendência de crescimento
interface GrowthTrend {
  month: string;
  growth: number;
}

// Serviço de Dashboard
class DashboardService {
  // Obter qualidade média da colheita por mês
  async getHarvestQualityByMonth(
    userSession: IUserPayload
  ): Promise<HarvestQualityByMonth[]> {
    try {
      const harvests: IHarvest[] = await HarvestService.getAll(userSession);
      const grouped: Record<string, { totalQuality: number; count: number }> =
        {};

      // Agrupar colheitas por mês e calcular qualidade média
      harvests.forEach((h) => {
        const date = dayjs(h.harvestDate);
        const key = `${date.year()}-${date.month() + 1}`;
        grouped[key] = grouped[key] || { totalQuality: 0, count: 0 };
        grouped[key].totalQuality += h.quality;
        grouped[key].count += 1;
      });

      // Transformar o resultado em um array
      return Object.entries(grouped).map(
        ([period, { totalQuality, count }]) => ({
          period,
          averageQuality: (totalQuality / count).toFixed(2),
        })
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Obter colheitas dos últimos 7 dias
  async getHarvestThisWeek(userSession: IUserPayload): Promise<HarvestByDay[]> {
    try {
      const harvests = await HarvestService.getAll(userSession);
      const today = dayjs();
      const sevenDaysAgo = today.subtract(6, "day");

      const daily: Record<string, number> = {};
      // Inicializar os últimos 7 dias com 0
      for (let i = 0; i < 7; i++) {
        const date = sevenDaysAgo.add(i, "day");
        daily[date.format("DD/MM")] = 0;
      }

      // Somar as colheitas por dia
      harvests.forEach((h) => {
        const key = dayjs(h.harvestDate).format("DD/MM");
        if (daily[key] !== undefined) daily[key] += h.harvestedQuantity;
      });

      return Object.entries(daily).map(([day, total]) => ({ day, total }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Obter total de colheitas por mês
  async getTotalHarvestByMonth(
    userSession: IUserPayload
  ): Promise<Record<string, number>> {
    try {
      const harvests = await HarvestService.getAll(userSession);
      const grouped: Record<string, number> = {};

      // Agrupar colheitas por mês
      harvests.forEach((h) => {
        const key = `${dayjs(h.harvestDate).year()}-${
          dayjs(h.harvestDate).month() + 1
        }`;
        grouped[key] = (grouped[key] || 0) + h.harvestedQuantity;
      });

      return grouped;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  // Obter tendência de crescimento das colheitas
  async getPlantingGrowthTrend(
    userSession: IUserPayload
  ): Promise<GrowthTrend[]> {
    try {
      const totalByMonth = await this.getTotalHarvestByMonth(userSession);
      const months = Object.keys(totalByMonth).sort();

      // Calcular a tendência de crescimento mês a mês
      return months.map((month, i) => {
        if (i === 0) return { month, growth: 0 };
        const prev = totalByMonth[months[i - 1]];
        const current = totalByMonth[month];
        const growth = ((current - prev) / (prev || 1)) * 100;
        return { month, growth: Number(growth.toFixed(2)) };
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new DashboardService();
