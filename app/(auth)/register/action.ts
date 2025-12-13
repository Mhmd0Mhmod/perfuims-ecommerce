"use server";

import AxiosServerInstance from "@/lib/axios-server";
import { ErrorResponse } from "@/lib/utils";
import { RegisterSchema } from "@/lib/zod";
import { User } from "next-auth";

export async function registerAction(formData: RegisterSchema): Promise<ApiResponse<User>> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.post("auth/register", formData);
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
