// Importando os frameworks e conexões
import express from "express";
import mongoose from "./config/db-connection.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Importando as Rotas (endpoints)
import CompanyRoutes from "./routes/CompanyRoutes.js";
import HarvestRoutes from "./routes/HarvestRoutes.js";
import LocationRoutes from "./routes/LocationRoutes.js";
import PlantingRoutes from "./routes/PlantingRoutes.js";
import SensorDataRoutes from "./routes/SensorDataRoutes.js";
import SensorRoutes from "./routes/SensorRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";

// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// Definindo o Uso das Rotas
app.use("/", CompanyRoutes);
app.use("/", HarvestRoutes);
app.use("/", LocationRoutes);
app.use("/", PlantingRoutes);
app.use("/", SensorDataRoutes);
app.use("/", SensorRoutes);
app.use("/", UserRoutes);

// Rota Principal
app.get("/home", (req, res) => {
  res.render("index", {
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
