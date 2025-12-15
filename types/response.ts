type ApiResponse<T = unknown> = {
  status?: number;
  data?: T;
  success: boolean;
  error?: string;
  message?: string;
};
