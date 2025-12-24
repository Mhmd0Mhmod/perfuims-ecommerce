import { getCookies, getToken } from "@/app/(auth)/helper";
import axios from "axios";

const authFetcher = axios.create({
  baseURL: process.env.RAILWAY_API,
  headers: {
    "Content-Type": "application/json",
  },
});
authFetcher.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const countryCode = await getCookies("country");
  if (countryCode) {
    config.headers["X-Country-Code"] = countryCode;
  }
  return config;
});
export { authFetcher };
