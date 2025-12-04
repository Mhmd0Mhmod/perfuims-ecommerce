"use server";

import axiosInstance from "@/lib/axios";
import { ErrorResponse } from "@/lib/utils";
import { AddCategorySchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

export async function addCategory(data: AddCategorySchema): Promise<ApiResponse<Category>> {
  try {
    const response = await axiosInstance.post<Category>("admin/categories", data);
    revalidatePath("/admin/categories");
    return {
      data: response.data,
      status: response.status,
      message: "تمت إضافة التصنيف بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateCategory(
  categoryId: number,
  data: Partial<AddCategorySchema>,
): Promise<ApiResponse<Category>> {
  try {
    const response = await axiosInstance.patch<Category>(`admin/categories/${categoryId}`, data);
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath("/admin/categories");
    return {
      data: response.data,
      status: response.status,
      message: "تم تحديث بيانات التصنيف بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteCategory(categoryId: number): Promise<ApiResponse> {
  try {
    const response = await axiosInstance.delete(`admin/categories/${categoryId}`);
    revalidatePath("/admin/categories");
    return {
      status: response.status,
      message: "تم حذف التصنيف بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
