import axios from "axios";

// Criar instância da API
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Para cookies HTTP-only
  timeout: 10000, // 10 segundos timeout
});

// Request interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    // Tenta pegar o token do localStorage (para SPA/Mobile)
    const token = localStorage.getItem("auth_token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se erro 401 e não é tentativa de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Limpar token inválido
      localStorage.removeItem("auth_token");
      delete api.defaults.headers.common.Authorization;
      
      // Redirecionar para login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }

    // Tratamento de outros erros
    if (error.response?.status >= 500) {
      console.error("Erro do servidor:", error);
    }

    return Promise.reject(error);
  }
);

// Helper para verificar autenticação
export const checkAuth = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) return false;

    const response = await api.get("/auth/me");
    return response.data?.success && response.data.user;
  } catch {
    return false;
  }
};

// Helper para logout
export const logout = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Erro no logout:", error);
  } finally {
    localStorage.removeItem("auth_token");
    delete api.defaults.headers.common.Authorization;
    
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  }
};

export default api;