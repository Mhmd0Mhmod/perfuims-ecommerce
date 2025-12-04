import { getToken } from "@/app/(auth)/action";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.RAILWAY_API,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.error) {
      return Promise.reject(new Error(response.data.error.message || "An error occurred"));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
const publicAxiosInstance = axios.create({
  baseURL: process.env.RAILWAY_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export { publicAxiosInstance };
export default axiosInstance;
