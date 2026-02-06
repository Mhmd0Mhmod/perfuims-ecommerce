import { AxiosError } from "axios";

export type IAPIResponse<T = unknown> = { message?: string } & (
  | {
      success: true;
      data?: T;
    }
  | {
      success: false;
      error?: string;
    }
);

export class APIResponse {
  static success<T = undefined>(data?: T, message?: string): IAPIResponse<T> {
    return {
      data,
      success: true,
      message,
    };
  }
  static error<T = void>(error: unknown): IAPIResponse<T> {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        error: axiosError.response?.statusText || "Internal Server Error",
        message: axiosError.response?.data.message || "An unexpected error occurred",
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        error: "Internal Server Error",
        message: error.message,
      };
    }
    return {
      success: false,
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    };
  }
}
