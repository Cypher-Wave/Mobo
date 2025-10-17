import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

// Criar instância da API
const api = axios.create({
  baseURL: `http://localhost:${PORT}/api`,
  headers: {
    "Content-Type": "application/json",
  },
   withCredentials: true,
});

// Interceptor para adicionar JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de resposta para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirecionar para login se token expirou
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
