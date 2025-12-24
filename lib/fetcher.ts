import { getToken } from "@/app/(auth)/action";
import axios from "axios";

const authFetcher = axios.create({
  baseURL: process.env.RAILWAY_API,
  headers: {
    "Content-Type": "application/json"
  }
});
authFetcher.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILWAY_API,
  headers: {
    "Content-Type": "application/json"
  }
});
export { authFetcher, fetch };
