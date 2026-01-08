
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. http://localhost:8080/api
  withCredentials: true, // keep true if you use cookies / sessions
  timeout: 10000,
    headers: {
    'Content-Type': 'application/json',
  }
});

/* ============================
   REQUEST INTERCEPTOR
   ============================ */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
   ============================ */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // token expired / invalid
      localStorage.removeItem("token");
      // optional redirect
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
