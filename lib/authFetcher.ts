import axios from "axios";
import { auth } from "./auth";
import { getCookiesToString } from "@/app/actions";

const authFetcher = axios.create({
  baseURL: process.env.SPRING_API,
  headers: {
    "Content-Type": "application/json",
  },
});
authFetcher.interceptors.request.use(async (config) => {
  const [session, cookieString] = await Promise.all([auth(), getCookiesToString()]);

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  if (cookieString) {
    config.headers.Cookie = cookieString;
  }

  return config;
});
export { authFetcher };
