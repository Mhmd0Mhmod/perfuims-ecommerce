import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ErrorResponse(error: unknown): ResponseError {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<{ message: string }>;
    return {
      status: axiosError.response?.status || 500,
      error: axiosError.response?.statusText || "Internal Server Error",
      message: axiosError.response?.data.message || "An unexpected error occurred",
    };
  }
  if (error instanceof Error) {
    return {
      status: 500,
      error: "Internal Server Error",
      message: error.message,
    };
  }
  return {
    status: 500,
    error: "Internal Server Error",
    message: "An unexpected error occurred",
  };
}
