"use server";

import axiosInstance from "@/lib/axios";
import { ErrorResponse } from "@/lib/utils";
import { AddCategorySchema } from "@/lib/zod";

export async function addCategory(data: AddCategorySchema) {
  try {
    const respone = await axiosInstance.post("admin/categories", data);
    return respone;
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateCategory(categoryId: number, data: Partial<AddCategorySchema>) {
  try {
    const respone = await axiosInstance.patch(`admin/categories/${categoryId}`, data);
    return respone;
  } catch (error) {
    return ErrorResponse(error);
  }
}
export async function deleteCategory(categoryId: number) {
  try {
    const respone = await axiosInstance.delete(`admin/categories/${categoryId}`);
    return respone;
  } catch (error) {
    return ErrorResponse(error);
  }
}
