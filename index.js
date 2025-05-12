// Importando os frameworks e conexões
import express from "express";
// import mongoose from "./config/db-connection.js";
import dotenv from "dotenv";
import flash from "express-flash";
import session from "express-session";
dotenv.config();
const app = express();
// Mongo local para teste na Fatec
import mongoose from "mongoose";
 mongoose.connect("mongodb://127.0.0.1:27017/"+process.env.DB_NAME);

// Configurações do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());

// Configurando o express-session
app.use(
  session({
    secret: process.env.JWT_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    // cookie: { maxAge: 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false,
  })
);

app.use((error, req, res, next) => {
  console.error("Erro não tratado:", error);
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor.",
  });
});

// Importando as Rotas da API
import CompanyRoutes from "./routes/api/CompanyRoutes.js";
import HarvestRoutes from "./routes/api/HarvestRoutes.js";
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
import ProfileRoutes from "./routes/views/ProfileRoutes.js";
import ReportRoutes from "./routes/views/ReportRoutes.js";
import SensorsRoutes from "./routes/views/SensorsRoutes.js";

// Definindo o Uso das Rotas da API
app.use("/api/", CompanyRoutes);
app.use("/api/", HarvestRoutes);
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
app.use("/", ProfileRoutes);
app.use("/", ReportRoutes);
app.use("/", SensorsRoutes);

// Rota Principal
app.get("/home", (req, res) => {
  res.render("home", {
    user: req.session.user,
    messages: req.flash(),
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
