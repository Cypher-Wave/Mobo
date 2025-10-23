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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
