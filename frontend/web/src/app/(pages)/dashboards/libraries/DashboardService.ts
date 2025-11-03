import { IHarvest } from "@/types/Harvest";
import { IPlanting } from "@/types/Planting";

function getPlantingName(planting: string | IPlanting | undefined): string {
  if (!planting) return "Desconhecido";
  if (typeof planting === "string") return planting;
  return planting.plantingName ?? "Sem Nome";
}

export function qualityData(harvests: IHarvest[]) {
  const labels = harvests.map((h) => getPlantingName(h.planting));
  const data = harvests.map((h) => h.quality);

  return {
    labels,
    datasets: [
      {
        label: "Qualidade",
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
  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const data = new Array(7).fill(0);

  harvests.forEach((h) => {
    if (!h.harvestDate) return;
    const day = new Date(h.harvestDate).getDay();
    data[day] += h.harvestedQuantity;
  });

  return {
    labels: week,
    datasets: [
      {
        label: "Quantidade Colhida",
        data,
        borderColor: "rgb(97, 116, 61)",
        backgroundColor: "rgb(97, 116, 61)",
        tension: 0.3,
        fill: true,
      },
    ],
  };
}

export function growthData(harvests: IHarvest[]) {
  const plantings = [
    ...new Set(harvests.map((h) => getPlantingName(h.planting))),
  ];

  const datasets = plantings.map((name, idx) => {
    const filtered = harvests.filter(
      (h) => getPlantingName(h.planting) === name
    );

    return {
      label: name,
      data: filtered.map((h) => h.harvestedQuantity),
      backgroundColor: "rgb(97, 116, 61)",
      borderColor: "rgb(97, 116, 61)",
      fill: false,
      tension: 0.3,
    };
  });

  return {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
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
