import { getCookies } from "@/app/(auth)/helper";
import axios from "axios";
import { auth } from "./auth";

const authFetcher = axios.create({
  baseURL: process.env.SPRING_API,
  headers: {
    "Content-Type": "application/json",
  },
});
authFetcher.interceptors.request.use(async (config) => {
  const session = await auth();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  const countryCode = await getCookies("country");
  if (countryCode) {
    config.headers["X-Country-Code"] = countryCode;
  }
  return config;
});
export { authFetcher };
