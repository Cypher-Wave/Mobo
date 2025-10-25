import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // importante para cookies HTTP-only
  timeout: 10000,
});

// ✅ NÃO adiciona Authorization — o cookie já é enviado automaticamente
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ✅ Trata 401 redirecionando para login
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }

    if (error.response?.status >= 500) {
      console.error("Erro do servidor:", error);
    }

    return Promise.reject(error);
  }
);

export default api;
