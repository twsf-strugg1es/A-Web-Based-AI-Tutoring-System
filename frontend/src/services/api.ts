import axios from "axios";

const api = axios.create({
  baseURL: "https://a-web-based-ai-tutoring-system.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
