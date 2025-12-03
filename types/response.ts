type ApiResponse<T = void> =
  | {
      status: number;
      data?: T;
      message: string;
      success: boolean;
    }
  | {
      status: number;
      error: string;
      message: string;
    };
