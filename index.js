// Importando os frameworks e conexões
import express from "express";
import mongoose from "mongoose";
// import mongoose from "./config/db-connection.js";
const app = express();

// Importando as rotas (endpoints)


// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Descomentar quando as rotas tiverem prontas 
// app.use("/")

// Estabelecendo a Conexão com o MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mobo");

// ROTA PRINCIPAL
app.get("/");

// Iniciando o servidor
const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Projeto rodando em http://localhost:${port}.`);
  }
});