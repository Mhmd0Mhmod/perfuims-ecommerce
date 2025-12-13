import axios from "axios";
import { getCookie } from "cookies-next/client";
import { getCsrfToken } from "next-auth/react";

const clientAuthAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILWAY_API,
  headers: {
    "Content-Type": "application/json",
    "X-Country-Code": getCookie("country"),
  },
});
clientAuthAxios.interceptors.request.use(async (config) => {
  const token = await getCsrfToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const publicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILWAY_API,
  headers: {
    "Content-Type": "application/json",
    "X-Country-Code": getCookie("country"),
  },
});
export { publicAxios };
export { clientAuthAxios };
