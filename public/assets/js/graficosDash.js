const adicionarBtn = document.getElementById("adicionar");
const notas = JSON.parse(localStorage.getItem("notas"));

// Graficos -
// Qualidade da Colheita 
const graphicQualityByMonth = document.getElementById("myChart");

let colorsDark = ["#ffffff"];
// Cores Verdes
let colors = ["#252f18", "#3c4c27", "#61743d", "#879c5f", "#b4c279", "#deebc1", "#f9ffeb"];

if (graphicQualityByMonth && typeof qualityLabels !== "undefined" && typeof qualityData !== "undefined") {
  new Chart(graphicQualityByMonth, {
    type: "pie",
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
  });
}

// Colheita da Semana 
const graphicHarvestThisWeek = document.getElementById("myChart2");
// Cores Vermelhas
let color = ["#430018", "#710029", "#b70a49", "#c23166", "#db6892", "#ff9cc0", "#ffc9dd"];

if (graphicHarvestThisWeek && typeof harvestWeekLabels !== "undefined" && typeof harvestWeekData !== "undefined") {
  new Chart(graphicHarvestThisWeek, {
    type: "pie",
    data: {
      labels: harvestWeekLabels,
      datasets: [{
        label: "Quantidade Colhida",
        data: harvestWeekData,
        backgroundColor: color,
        hoverBackgroundColor: "#ece2d6",
        hoverBorderColor: "#b80043",
        borderColor: "#ece2d6",
        borderWidth: 1
      }]
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
  });
}
