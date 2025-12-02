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
