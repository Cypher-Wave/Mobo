import axios from "axios";

const URI = "http://localhost:4000";

// Criar instância da API
const api = axios.create({
  baseURL: `${URI}/api`,
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
