import axios from "axios";

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export { fetcher };
