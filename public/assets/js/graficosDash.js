const adicionarBtn = document.getElementById("adicionar");
const notas = JSON.parse(localStorage.getItem("notas"));

// Graficos -
// Qualidade da Colheita 
const graphicQualityByMonth = document.getElementById("myChart");

let colorsDark = ["#ffffff"];
let colors = ["#597427", "#1b410c"];

if (graphicQualityByMonth && typeof qualityLabels !== "undefined" && typeof qualityData !== "undefined") {
  new Chart(graphicQualityByMonth, {
    type: "polarArea",
    data: {
      labels: qualityLabels,
      datasets: [
        {
          label: `Quality:`,
          data: qualityData,
          borderWidth: 1,
          backgroundColor: colors,
          hoverBackgroundColor: "#ece2d6",
          hoverBorderColor: "#597427",
          borderColor: "#ece2d6",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          responsive: true,
          maintainAspectRatio: true, // Mantém a proporção ao redimensionar
          aspectRatio: 2, // Ajusta a proporção (largura/altura)
        },
      },
    },
  });
}

// Colheita da Semana 
const graphicHarvestThisWeek = document.getElementById("myChart2");
let color = ["#b80043", "#dd0d59"];

if (graphicHarvestThisWeek && typeof harvestWeekLabels !== "undefined" && typeof harvestWeekData !== "undefined") {
  new Chart(graphicHarvestThisWeek, {
    type: "polarArea",
    data: {
      labels: harvestWeekLabels,
      datasets: [
        {
          label: "Colheita(kg):",
          data: harvestWeekData,
          borderWidth: 1,
          backgroundColor: color,
          hoverBackgroundColor: "#ece2d6",
          hoverBorderColor: "#b80043",
          borderColor: "#ece2d6",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Tendencia Crescimento da Plantação
const graphicGrowthTrend = document.getElementById("myChart3");

if (graphicGrowthTrend && typeof trendLabels !== "undefined" && typeof trendData !== "undefined") {
  new Chart(graphicGrowthTrend, {
    type: "pie",
    data: {
      labels: trendLabels,
      datasets: [
        {
          label: "# of Votes",
          data: trendData,
          borderWidth: 1,
          backgroundColor: colors,
          hoverBackgroundColor: "#ece2d6",
          hoverBorderColor: "#597427",
          borderColor: "#ece2d6",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Total Colhido 
const graphicTotalHarvestByMonth = document.getElementById("myChart4");

if (graphicTotalHarvestByMonth && typeof totalLabels !== "undefined" && typeof totalData !== "undefined") {
  new Chart(graphicTotalHarvestByMonth, {
    type: "pie",
    data: {
      labels: totalLabels,
      datasets: [
        {
          label: "Quantity: ",
          data: totalData,
          borderWidth: 1,
          backgroundColor: color,
          hoverBackgroundColor: "#ece2d6",
          hoverBorderColor: "#b80043",
          borderColor: "#ece2d6",
          font: "Livvic",
        },
      ],
    },
    options: {
      scales: { y: { beginAtZero: true } },
    },
  });
}
