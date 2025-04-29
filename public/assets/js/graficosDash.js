const adicionarBtn = document.getElementById('adicionar');
const notas = JSON.parse(localStorage.getItem("notas"));


const grafico1 = document.getElementById('myChart');

// Graficos - 
   
let colorsDark = ['#ffffff'];
let nomesx=[10,599,800,100,1000];
let colors = ['#597427','#1b410c'];

let valores=[20,10,300,40,70,400,800,300.1];
            
new Chart(grafico1, {
    type: 'pie',
    data: { labels: nomesx,
    datasets: [{label: '# of Votes',
    data: valores,
    borderWidth: 1,
    backgroundColor: colors,
    hoverBackgroundColor: '#ece2d6',
    hoverBorderColor: '#597427',
    borderColor: '#ece2d6',
  }]
  },
    options: {
    scales: {
    y: {
    beginAtZero: true,
    responsive: true,
        maintainAspectRatio: true, // Mantém a proporção ao redimensionar
        aspectRatio: 2 // Ajusta a proporção (largura/altura)
 }}
}}
); 

const grafico2 = document.getElementById('myChart2');
let nomex=["Bom","Ruim"];
let color = ['#b80043','#dd0d59'];

let valor=[20,10,30,40,70];

                      
new Chart(grafico2, {
    type: 'polarArea',
    data: { labels: nomex,
    datasets: [{label: '# of Votes',
    data: valor,
    borderWidth: 1,
    backgroundColor: color,
    hoverBackgroundColor: '#ece2d6',
    hoverBorderColor: '#b80043',
    borderColor: '#ece2d6',   }]
  },
    options: {
    scales: {
    y: {
    beginAtZero: true
 }}
}}
); 

const grafico3 = document.getElementById('myChart3');
let nome=["ótimo","Ruim"];
let valorX=[20,10,30,40,70];
                      
new Chart(grafico3, {
    type: 'doughnut',
    data: { labels: nome,
    datasets: [{label: '# of Votes',
    data: valorX,
    borderWidth: 1,
    backgroundColor: colors,
    hoverBackgroundColor: '#ece2d6',
    hoverBorderColor: '#597427',
    borderColor: '#ece2d6',   
  }]
  },
    options: {
    scales: {
    y: {
    beginAtZero: true
 }}
}}
); 

const grafico4 = document.getElementById('myChart4');
let Nome=[65, 59, 80, 81, 56, 55, 40];
let ValorX=[200,10,30,40,20,40,80,90,70];

                      
new Chart(grafico4, {
    type: 'pie',
    data: { labels: Nome,
    datasets: [{label: '# of Votes',
    data: ValorX,
    borderWidth: 1,
    backgroundColor: color,
    hoverBackgroundColor: '#ece2d6',
    hoverBorderColor: '#b80043',
    borderColor: '#ece2d6',  
    font: 'Livvic'
   }]
  },
    options: {
    scales: {y: {beginAtZero: true}},
}}

); 
