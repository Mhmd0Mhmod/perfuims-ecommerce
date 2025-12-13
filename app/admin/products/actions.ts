"use server";

import { default as AxiosServerInstance } from "@/lib/axios-server";
import { ErrorResponse } from "@/lib/utils";
import { AddProductSchema } from "@/lib/zod";
import { Product } from "@/types/product";
import { revalidatePath } from "next/cache";

export async function addProduct(data: AddProductSchema): Promise<ApiResponse<Product>> {
  try {
    const axiosInstance = await AxiosServerInstance();

    const response = await axiosInstance.post<Product>("admin/products", data);
    revalidatePath("/admin/products");
    return {
      data: response.data,
      status: response.status,
      message: "تمت إضافة المنتج بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateProduct(
  productId: number,
  data: Partial<AddProductSchema>,
): Promise<ApiResponse<Product>> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.patch<Product>(`admin/products/${productId}`, data);
    revalidatePath("/admin/products");
    return {
      data: response.data,
      status: response.status,
      message: "تم تحديث بيانات المنتج بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteProduct(productId: number): Promise<ApiResponse> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.delete(`admin/products/${productId}`);
    revalidatePath("/admin/products");
    return {
      status: response.status,
      message: "تم حذف المنتج بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
