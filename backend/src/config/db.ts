import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, USE_LOCAL_DB } = process.env;

// Verifica se a variável do nome do banco está definida
if (!DB_NAME) {
  console.error("❌ Variável de ambiente DB_NAME não configurada");
  process.exit(1);
}

// Função para conectar ao MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    let uri: string;

    if (USE_LOCAL_DB === "true") {
      // Conexão com MongoDB local (Fatec)
      uri = `mongodb://127.0.0.1:27017/${DB_NAME}`;
      console.log("🌐 Conectando ao MongoDB local...");
    } else {
      // Conexão com MongoDB Atlas (casa)
      if (!DB_USER || !DB_PASSWORD) {
        console.error(
          "❌ Variáveis de ambiente DB_USER ou DB_PASSWORD não configuradas para Atlas"
        );
        process.exit(1);
      }
      uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@mobo.eswkbcg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mobo`;
      console.log("🌐 Conectando ao MongoDB Atlas...");
    }

    await mongoose.connect(uri);
    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

export default mongoose;
