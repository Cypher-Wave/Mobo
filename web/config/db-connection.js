import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Usuário e senha do banco de dados
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const connect = () => {
  mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@mobo.eswkbcg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mobo`
  );
  const connection = mongoose.connection;
  connection.on("error", () => {
    console.log("Erro ao conectar com o MongoDB.");
  });
  connection.on("open", () => {
    console.log("Conectado ao MongoDB com sucesso!");
  });
};

connect();

export default mongoose;
