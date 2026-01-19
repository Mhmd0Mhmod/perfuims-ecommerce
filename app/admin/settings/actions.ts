"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { StoreSettingsSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

export async function updateStoreSettingsAction(
  formData: StoreSettingsSchema,
): Promise<ApiResponse> {
  try {
    const response = await authFetcher.patch("admin/settings", formData);
    revalidatePath("/admin/settings");
    return {
      success: true,
      data: response.data,
      message: "تم تحديث إعدادات المتجر بنجاح",
      status: response.status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
