import { getCookiesToString } from "@/app/actions";
import axios from "axios";

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_API,
  headers: {
    "Content-Type": "application/json",
  },
});
fetcher.interceptors.request.use(async (config) => {
  const cookieString = await getCookiesToString();
  if (cookieString) {
    config.headers.Cookie = cookieString;
  }

  return config;
});
export { fetcher };
