// Importando dependências
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { errorMiddleware } from "./middlewares/errorMiddleware";

// Configurando variáveis de ambiente e inicializando o Express
dotenv.config();
const app: Application = express();

// Conectando ao banco de dados
connectDB();

// Importando rotas da API
import AuthRoutes from "./routes/AuthRoutes";
import CompanyRoutes from "./routes/CompanyRoutes";
import HarvestRoutes from "./routes/HarvestRoutes";
import PlantingRoutes from "./routes/PlantingRoutes";
import SensorDataRoutes from "./routes/SensorDataRoutes";
import SensorRoutes from "./routes/SensorRoutes";
import UserRoutes from "./routes/UserRoutes";

// Configurações do Express
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definindo rotas principais da API
app.use("/api/auth", AuthRoutes);
app.use("/api/company", CompanyRoutes);
app.use("/api/harvest", HarvestRoutes);
app.use("/api/planting", PlantingRoutes);
app.use("/api/sensordata", SensorDataRoutes);
app.use("/api/sensor", SensorRoutes);
app.use("/api/user", UserRoutes);

// Rota inexistente
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Rota principal de teste
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API Lychee rodando ✅" });
});

// Middleware global de tratamento de erros
app.use(errorMiddleware);

// Inicialização do servidor
const URI = process.env.URI;
app.listen(URI, () => {
  console.log(`Servidor rodando em ${URI}`);
});