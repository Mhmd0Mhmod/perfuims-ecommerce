import { getCookies, getToken } from "@/app/(auth)/action";
import axios from "axios";
import { getCookie } from "cookies-next/client";

const publicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILWAY_API,
  headers: {
    "Content-Type": "application/json",
    "X-Country-Code": getCookie("country"),
  },
});
publicAxios.interceptors.request.use(async (config) => {
  let country = getCookie("country");
  if (!country) {
    country = await getCookies("country");
  }
  if (country) {
    config.headers["X-Country-Code"] = country;
  }
  return config;
});

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILWAY_API,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(async (config) => {
  let country = getCookie("country");
  if (!country) {
    country = await getCookies("country");
  }
  if (country) {
    config.headers["X-Country-Code"] = country;
  }
  const token = await getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { publicAxios, axiosInstance };
