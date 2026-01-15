import axios from "axios";

export const api = axios.create({
  baseURL: "https://unhasvf-api.onrender.com",
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem("@vfunhas:user");
  if (userData) {
    const { token } = JSON.parse(userData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
