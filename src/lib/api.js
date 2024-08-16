import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API_RAILS
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;