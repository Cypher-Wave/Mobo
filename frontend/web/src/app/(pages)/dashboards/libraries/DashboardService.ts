import { IHarvest } from "@/types/Harvest";
import { IPlanting } from "@/types/Planting";

function getPlantingName(planting: string | IPlanting | undefined): string {
  if (!planting) return "Desconhecido";
  if (typeof planting === "string") return planting;
  return planting.plantingName ?? "Sem Nome";
}

function parseDateAsLocalDay(dateLike: string | Date | undefined): Date | null {
  if (!dateLike) return null;
  const s = typeof dateLike === "string" ? dateLike : dateLike.toISOString();
  // tenta extrair YYYY-MM-DD (se vier com timezone, por exemplo "2024-11-04T00:00:00.000+00:00")
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!m) {
    // fallback: tentar criar Date normal
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }
  const [year, month, day] = m[1].split("-").map(Number);
  // cria Date no horário local à meia-noite daquele dia
  return new Date(year, month - 1, day);
}

function normalizeLocalDate(dateLike: Date): Date {
  const d = parseDateAsLocalDay(dateLike);
  return d ?? null!;
}

/** Retorna start of week baseado em weekStartDay (0=Dom, 1=Seg, ... 6=Sáb) */
function getWeekStart(dateLike: Date, weekStartDay = 0): Date {
  const d = new Date(
    dateLike.getFullYear(),
    dateLike.getMonth(),
    dateLike.getDate()
  );
  const day = d.getDay(); // 0..6
  // quantos dias voltar até atingir weekStartDay
  const diff = (day - weekStartDay + 7) % 7;
  d.setDate(d.getDate() - diff);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatShort(d: Date): string {
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
}

export function qualityData(harvests: IHarvest[]) {
  // ✅ 1. Filtrar apenas os últimos 30 dias
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const filtered = harvests.filter((h) => {
    const d = new Date(h.harvestDate);
    return d >= thirtyDaysAgo && d <= now;
  });

  // ✅ 2. Agrupar por talhão e calcular média da qualidade
  const groups: Record<string, { totalQuality: number; count: number }> = {};

  filtered.forEach((h) => {
    const plantingName = getPlantingName(h.planting);

    if (!groups[plantingName]) {
      groups[plantingName] = { totalQuality: 0, count: 0 };
    }

    groups[plantingName].totalQuality += h.quality;
    groups[plantingName].count += 1;
  });

  // ✅ 3. Transformar em arrays para o gráfico
  const labels = Object.keys(groups);
  const data = labels.map(
    (name) => groups[name].totalQuality / groups[name].count // média
  );

  return {
    labels,
    datasets: [
      {
        label: "Média de Qualidade por Talhão (Últimos 30 dias)",
        data,
        backgroundColor: [
          "rgb(174, 88, 119)",
          "rgb(241, 43, 115)",
          "rgb(183, 10, 73)",
          "rgb(131, 5, 51)",
          "rgb(92, 6, 37)",
        ],
        fill: true,
      },
    ],
  };
}

export function weeklyHarvestData(harvests: IHarvest[]) {
  const today = new Date();
  const todayLocal = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startLocal = new Date(todayLocal);
  startLocal.setDate(startLocal.getDate() - 6);

  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Labels rotacionadas (hoje +1)
  const labels = Array.from({ length: 7 }, (_, i) => {
    const idx = (todayLocal.getDay() + 1 + i) % 7;
    return week[idx];
  });

  const startWeekday = (todayLocal.getDay() + 1) % 7;

  // AGRUPAR POR TALHÃO
  const plantings = [
    ...new Set(harvests.map((h) => getPlantingName(h.planting))),
  ];

  const datasets = plantings.map((plantingName) => {
    // Array de 7 posições para esse talhão
    const data = new Array<number>(7).fill(0);

    // Filtrar colheitas desse talhão
    const filtered = harvests.filter(
      (h) => getPlantingName(h.planting) === plantingName
    );

    filtered.forEach((h) => {
      const d = parseDateAsLocalDay(h.harvestDate);
      if (!d) return;

      if (d < startLocal || d > todayLocal) return;

      const weekday = d.getDay();
      const pos = (weekday - startWeekday + 7) % 7;

      data[pos] += Number(h.harvestedQuantity || 0);
    });

    return {
      label: plantingName,
      data,
      borderColor: [
        "rgb(97, 116, 61)",
        "rgb(60, 76, 39)",
        "rgb(144, 171, 96)",
        "rgb(34, 44, 21)",
        "rgb(203, 232, 144)",
      ],
      backgroundColor: [
        "rgb(97, 116, 61)",
        "rgb(60, 76, 39)",
        "rgb(144, 171, 96)",
        "rgb(34, 44, 21)",
        "rgb(203, 232, 144)",
      ],
      tension: 0.3,
      fill: true,
    };
  });

  return {
    labels,
    datasets,
  };
}

export function growthData(
  harvests: IHarvest[],
  weekStartDay: number = 0 // altere para 1 se quiser semanas seg–dom
) {
  // safe guard
  if (!harvests || harvests.length === 0) {
    return { labels: [], datasets: [] };
  }

  // normaliza todas as datas para date-only local
  const normalized = harvests
    .map((h) => {
      const d = parseDateAsLocalDay(h.harvestDate);
      if (!d) return null;
      return { ...h, __day: d }; // __day = Date local (midnight)
    })
    .filter(Boolean) as (IHarvest & { __day: Date })[];

  // hoje date-only local
  const today = new Date();
  const todayLocal = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // start da semana atual conforme weekStartDay
  const currentWeekStart = getWeekStart(todayLocal, weekStartDay);

  // construir as últimas 4 semanas: (semana atual) e as 3 anteriores
  const weekStarts: Date[] = [];
  for (let i = 3; i >= 0; i--) {
    const ws = new Date(currentWeekStart);
    ws.setDate(currentWeekStart.getDate() - i * 7);
    weekStarts.push(new Date(ws.getFullYear(), ws.getMonth(), ws.getDate())); // date-only
  }

  // semanas com start e end (inclusive: start <= d <= end)
  const weeks = weekStarts.map((ws) => {
    const we = new Date(ws);
    we.setDate(ws.getDate() + 6);
    return { start: ws, end: we };
  });

  // labels dd/mm – dd/mm (curtas)
  const labels = weeks.map(
    (w) => `${formatShort(w.start)} – ${formatShort(w.end)}`
  );

  // obter nomes únicos de plantings (ordem preservada)
  const plantings = [
    ...new Set(normalized.map((h) => getPlantingName(h.planting))),
  ];

  // para cada talhão, somar quantidade por semana
  const datasets = plantings.map((name, idx) => {
    const data = weeks.map((week) => {
      const sum = normalized
        .filter(
          (h) =>
            getPlantingName(h.planting) === name &&
            h.__day.getTime() >= week.start.getTime() &&
            h.__day.getTime() <= week.end.getTime()
        )
        .reduce((acc, h) => acc + Number(h.harvestedQuantity || 0), 0);
      return sum;
    });

    return {
      label: name,
      data,
      backgroundColor: [
        "rgb(97, 116, 61)",
        "rgb(60, 76, 39)",
        "rgb(144, 171, 96)",
        "rgb(34, 44, 21)",
        "rgb(203, 232, 144)",
      ],
      borderColor: [
        "rgb(97, 116, 61)",
        "rgb(60, 76, 39)",
        "rgb(144, 171, 96)",
        "rgb(34, 44, 21)",
        "rgb(203, 232, 144)",
      ],
      fill: false,
      tension: 0.3,
    };
  });

  return {
    labels,
    datasets,
  };
}

export function totalHarvestData(harvests: IHarvest[]) {
  const labels = [...new Set(harvests.map((h) => getPlantingName(h.planting)))];

  const data = labels.map((label) =>
    harvests
      .filter((h) => getPlantingName(h.planting) === label)
      .reduce((sum, h) => sum + h.harvestedQuantity, 0)
  );

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "rgb(174, 88, 119)",
          "rgb(241, 43, 115)",
          "rgb(183, 10, 73)",
          "rgb(131, 5, 51)",
          "rgb(92, 6, 37)",
        ],
        borderColor: ["rgb(236, 226, 214)"],
        borderWidth: 2,
      },
    ],
  };
}
