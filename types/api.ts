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
      message
    };
  }

  static error<T = void>(error: unknown): IAPIResponse<T> {
    if (error instanceof AxiosError) {
      console.dir(error.response);
      const axiosError = error as AxiosError<{ message: string }>;
      let message = axiosError.response?.data.message || "An unexpected error occurred";
      if (axiosError.response?.data)
        message = Object.values(axiosError.response?.data).join(" & ");
      return {
        success: false,
        error: axiosError.response?.statusText || "Internal Server Error",
        message
      };

    }
    if (error instanceof Error) {
      return {
        success: false,
        error: "Internal Server Error",
        message: error.message
      };
    }
    return {
      success: false,
      error: "Internal Server Error",
      message: "An unexpected error occurred"
    };
  }
}
