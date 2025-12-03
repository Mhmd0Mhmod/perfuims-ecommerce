import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
export function formatDate(dateString: string, type: "short" | "long" = "long"): string {
  const date = new Date(dateString);
  if (type === "short") {
    return Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  }
  return Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function ErrorResponse<T = void>(error: unknown): ApiResponse<T> {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<{ message: string }>;
    return {
      success: false,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.statusText || "Internal Server Error",
      message: axiosError.response?.data.message || "An unexpected error occurred",
    };
  }
  if (error instanceof Error) {
    return {
      success: false,
      status: 500,
      error: "Internal Server Error",
      message: error.message,
    };
  }
  return {
    success: false,
    status: 500,
    error: "Internal Server Error",
    message: "An unexpected error occurred",
  };
}
