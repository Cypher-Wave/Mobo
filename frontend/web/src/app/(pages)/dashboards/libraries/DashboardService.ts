export const qualityData = {
  labels: ["Planta A", "Planta B", "Planta C", "Planta D", "Planta E"],
  datasets: [
    {
      label: "Qualidade",
      data: [8, 9, 7, 10, 6],
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

export const weeklyHarvestData = {
  labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  datasets: [
    {
      label: "Quantidade Colhida",
      data: [0, 20, 45, 35, 30, 50, 0],
      borderColor: "rgb(97, 116, 61)",
      backgroundColor: "rgb(97, 116, 61)",
      tension: 0.3,
      fill: true,
    },
  ],
};

export const growthData = {
  labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
  datasets: [
    {
      label: "Planta A",
      data: [20, 40, 25, 35],
      backgroundColor: "rgb(97, 116, 61)",
      borderColor: "rgb(97, 116, 61)",
      fill: false,
      tension: 0.3,
    },
    {
      label: "Planta B",
      data: [5, 15, 25, 50],
      backgroundColor: "rgb(48, 74, 13)",
      borderColor: "rgb(48, 74, 13)",
      fill: false,
      tension: 0.3,
    },
    {
      label: "Planta C",
      data: [10, 30, 40, 20],
      backgroundColor: "rgb(144, 171, 96)",
      borderColor: "rgb(144, 171, 96)",
      fill: false,
      tension: 0.3,
    },
    {
      label: "Planta D",
      data: [30, 50, 10, 60],
      backgroundColor: "rgb(34, 44, 21)",
      borderColor: "rgb(34, 44, 21)",
      fill: false,
      tension: 0.3,
    },
    {
      label: "Planta E",
      data: [5, 10, 30, 15],
      backgroundColor: "rgb(180, 234, 72)",
      borderColor: "rgb(180, 234, 72)",
      fill: false,
      tension: 0.3,
    },
  ],
};

export const totalHarvestData = {
  labels: ["Planta A", "Planta B", "Planta C", "Planta D", "Planta E"],
  datasets: [
    {
      data: [120, 95, 100, 150, 60],
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
