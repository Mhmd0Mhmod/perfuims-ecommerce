"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { UpdateProfileSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: UpdateProfileSchema): Promise<ApiResponse> {
  try {
    const response = await authFetcher.patch("/users/profile", formData);
    revalidatePath("/account/settings");
    return {
      success: true,
      data: response.data,
      message: "تم تحديث البيانات بنجاح",
      status: response.status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
