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

  return config;
});
export { authFetcher };
