// Importando os frameworks e conexões
import express from "express";
import mongoose from "mongoose";
// import mongoose from "./config/db-connection.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Mongo local para teste
mongoose.connect("mongodb://127.0.0.1:27017/"+process.env.DB_NAME);

// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// Importando as Rotas da API
import CompanyRoutes from "./routes/api/CompanyRoutes.js";
import HarvestRoutes from "./routes/api/HarvestRoutes.js";
import LocationRoutes from "./routes/api/LocationRoutes.js";
import PlantingRoutes from "./routes/api/PlantingRoutes.js";
import SensorDataRoutes from "./routes/api/SensorDataRoutes.js";
import SensorRoutes from "./routes/api/SensorRoutes.js";
import UserRoutes from "./routes/api/UserRoutes.js";

// Importando as Rotas das Views
import AlertRoutes from "./routes/views/AlertRoutes.js";
import ClawArmRoutes from "./routes/views/ClawArmRoutes.js";
import DashboardRoutes from "./routes/views/DashboardRoutes.js";
import HarvestForecastRoutes from "./routes/views/HarvestForecastRoutes.js";
import LandRoutes from "./routes/views/LandRoutes.js";
import LoginRoutes from "./routes/views/LoginRoutes.js";
// import ProfileRoutes from "./routes/views/ProfileRoutes.js";
import ReportRoutes from "./routes/views/ReportRoutes.js";
import SensorsRoutes from "./routes/views/SensorsRoutes.js";

// Definindo o Uso das Rotas da API
app.use("/api/", CompanyRoutes);
app.use("/api/", HarvestRoutes);
app.use("/api/", LocationRoutes);
app.use("/api/", PlantingRoutes);
app.use("/api/", SensorDataRoutes);
app.use("/api/", SensorRoutes);
app.use("/api/", UserRoutes);

// Definindo o Uso das Rotas das Views
app.use("/", AlertRoutes);
app.use("/", ClawArmRoutes);
app.use("/", DashboardRoutes);
app.use("/", HarvestForecastRoutes);
app.use("/", LandRoutes);
app.use("/", LoginRoutes);
// app.use("/", ProfileRoutes);
app.use("/", ReportRoutes);
app.use("/", SensorsRoutes);

// Rota Principal
app.get("/home", (req, res) => {
  res.render("home", {
    pageTitle: "Home",
    cssPage: "home",
  });
});

// Iniciando o servidor
const port = process.env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Projeto rodando em http://localhost:${port}/home.`);
  }
});
