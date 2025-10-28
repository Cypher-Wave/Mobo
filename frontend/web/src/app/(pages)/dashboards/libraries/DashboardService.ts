// Aqui pegamos as cores das variáveis CSS direto no browser
const rootStyles = getComputedStyle(document.documentElement);

// Cores Padrões Mobo
const moboGreen = rootStyles.getPropertyValue("--mobo-green").trim();
const moboDarkGreen = rootStyles.getPropertyValue("--mobo-dark-green").trim();
const moboLightRed = rootStyles.getPropertyValue("--mobo-light-red").trim();
const moboRed = rootStyles.getPropertyValue("--mobo-red").trim();
const moboDarkRed = rootStyles.getPropertyValue("--mobo-dark-red").trim();
const moboBeige = rootStyles.getPropertyValue("--mobo-beige").trim();

// Cores Adicionais para Dashboards
const dashboardGreen = rootStyles.getPropertyValue("--dashboard-green").trim();
const dashboardLightGreen = rootStyles.getPropertyValue("--dashboard-light-green").trim();
const dashboardRed = rootStyles.getPropertyValue("--dashboard-red").trim();
const dashboardLightRed = rootStyles.getPropertyValue("--dashboard-light-red").trim();

export const qualityData = {
  labels: ["Planta A", "Planta B", "Planta C"],
  datasets: [
    {
      label: "Qualidade",
      data: [8, 9, 7],
      backgroundColor: [`rgb(${moboLightRed})`, `rgb(${moboRed})`, `rgb(${moboDarkRed})`],
    },
  ],
};

export const weeklyHarvestData = {
  labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  datasets: [
    {
      label: "Quantidade Colhida",
      data: [120, 95, 100, 130, 110, 80, 90],
      borderColor: `rgb(${moboGreen})`,
      backgroundColor: `rgba(${moboGreen}, 0.3)`,
      tension: 0.4,
      fill: true,
    },
  ],
};

export const growthData = {
  labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
  datasets: [
    {
      label: "Planta A",
      data: [10, 20, 30, 40],
      backgroundColor: `rgb(${moboGreen})`,
      borderColor: `rgb(${moboGreen})`,
      fill: false,
      tension: 0.3,
    },
    {
      label: "Planta B",
      data: [5, 15, 25, 35],
      backgroundColor: `rgb(${moboDarkGreen})`,
      borderColor: `rgb(${moboDarkGreen})`,
      fill: false,
      tension: 0.3,
    },
  ],
};

export const totalHarvestData = {
  labels: ["Planta A", "Planta B", "Planta C"],
  datasets: [
    {
      data: [120, 95, 100],
      backgroundColor: [`rgb(${moboLightRed})`, `rgb(${moboRed})`, `rgb(${moboDarkRed})`],
      borderWidth: 2,
      borderColor: `rgb(${moboBeige})`,
    },
  ],
};
