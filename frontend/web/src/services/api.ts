import axios from "axios";

const api = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 15000,
});


// 🔵 REQUEST
api.interceptors.request.use(
  (config) => {
    console.log("➡️ Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Erro antes da requisição:", error);
    return Promise.reject(error);
  }
);


// 🔴 RESPONSE
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Sem resposta → problema de rede ou backend dormindo
    if (!error.response) {
      console.error("🌐 Erro de rede ou servidor offline:", error.message);

      // opcional: retry automático (1x)
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        console.log("🔁 Tentando novamente...");
        return api(originalRequest);
      }

      return Promise.reject({
        message: "Servidor indisponível. Tente novamente.",
      });
    }

    const status = error.response.status;

    // 401 → não autenticado
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.warn("🔒 Não autenticado, redirecionando...");

      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }

    // 403 → sem permissão
    if (status === 403) {
      console.warn("⛔ Acesso negado");
    }

    // 404 → endpoint errado
    if (status === 404) {
      console.warn("❓ Endpoint não encontrado:", originalRequest.url);
    }

    // 500 → erro backend
    if (status >= 500) {
      console.error("🔥 Erro no servidor:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
