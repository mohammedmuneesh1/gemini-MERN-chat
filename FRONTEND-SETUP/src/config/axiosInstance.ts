
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
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;




export const errorManagement = (error:unknown)=>{
    if (axios.isAxiosError(error)) {
    const backendMessage =
      error.response?.data?.response || // in case you named it differently
      error.message;
    console.error(backendMessage);
    return backendMessage;
  } else if (error instanceof Error) {
    console.error(error.message);
    return error.message
  } else {
    console.error(`Technical issue occured. Please refresh the page and try again later.`);
    return `Technical issue occured. Please refresh the page and try again later.`
  }
}