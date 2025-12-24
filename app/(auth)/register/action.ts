"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { RegisterSchema } from "@/lib/zod";
import { User } from "next-auth";

export async function registerAction(formData: RegisterSchema): Promise<ApiResponse<User>> {
  try {
    const response = await authFetcher.post("auth/register", formData);
    return {
      data: response.data,
      status: response.status,
      message: "تم التسجيل بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
