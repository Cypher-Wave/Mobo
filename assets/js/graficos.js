const adicionarBtn = document.getElementById("adicionar");
const notas = JSON.parse(localStorage.getItem("notas"));
const ctx = document.getElementById("myChart").getContext("2d");
ctx.canvas.width = 100; // Define a largura
ctx.canvas.height = 100; // Define a altura

const grafico1 = document.getElementById("myChart");

// Graficos -

let colorsDark = ["#ffffff"];
let nomesx = ["Talhão A", "Talhão B"];
let colors = ["#252f18", "#3c4c27", "#61743d", "#879c5f", "#b4c279", "#deebc1", "#f9ffeb"];

let valores = [45.6, 23.1];

new Chart(grafico1, {
  type: "polarArea",
  data: {
    labels: nomesx,
    datasets: [
      {
        label: "% da umidade do solo",
        data: valores,
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

const grafico2 = document.getElementById("myChart2");
let nomex = ["AIRH-001", "AIRH-010"];
let color = ["#430018", "#710029", "#b70a49", "#c23166", "#db6892", "#ff9cc0", "#ffc9dd"];

let valor = [68, 70];

new Chart(grafico2, {
  type: "polarArea",
  data: {
    labels: nomex,
    datasets: [
      {
        label: "% da umidade do ar",
        data: valor,
        borderWidth: 1,
        backgroundColor: colors,
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

const grafico3 = document.getElementById("myChart3");
let nome = ["TEMP-001", "TEMP-064"];
let valorX = [26.4, 28.8];

new Chart(grafico3, {
  type: "polarArea",
  data: {
    labels: nome,
    datasets: [
      {
        label: "Temperatura em °C",
        data: valorX,
        borderWidth: 1,
        backgroundColor: color,
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

const grafico4 = document.getElementById("myChart4");
let Nome = [65, 59, 80, 81, 56, 55, 40];
let ValorX = [200, 10, 30, 40, 20, 40, 80, 90, 70];

new Chart(grafico4, {
  type: "pie",
  data: {
    labels: Nome,
    datasets: [
      {
        label: "# of Votes",
        data: ValorX,
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
