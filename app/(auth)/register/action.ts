"use server";

import axiosInstance from "@/lib/axios";
import { ErrorResponse } from "@/lib/utils";
import { RegisterSchema } from "@/lib/zod";

export async function registerAction(formData: RegisterSchema): Promise<void | ResponseError> {
  try {
    const response = await axiosInstance.post("auth/register", formData);
    return response.data;
  } catch (error) {
    return ErrorResponse(error);
  }
}
