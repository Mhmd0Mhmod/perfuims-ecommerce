"use server";

import AxiosServerInstance from "@/lib/axios-server";
import axiosInstance from "@/lib/axios-server";
import { ErrorResponse } from "@/lib/utils";
import { AddSizeSchema } from "@/lib/zod";
import { Size } from "@/types/size";
import { revalidatePath } from "next/cache";

export async function addSize(data: AddSizeSchema): Promise<ApiResponse<Size>> {
  try {
    const axiosInstance = await AxiosServerInstance();

    const response = await axiosInstance.post<Size>("admin/sizes", data);
    revalidatePath("/admin/sizes");
    return {
      data: response.data,
      status: response.status,
      message: "تمت إضافة الحجم بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateSize(
  sizeId: string,
  data: Partial<AddSizeSchema>,
): Promise<ApiResponse<Size>> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.patch<Size>(`admin/sizes/${sizeId}`, data);
    revalidatePath("/admin/sizes");
    return {
      data: response.data,
      status: response.status,
      message: "تم تحديث بيانات الحجم بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteSize(sizeId: string): Promise<ApiResponse> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.delete(`admin/sizes/${sizeId}`);
    revalidatePath("/admin/sizes");
    return {
      status: response.status,
      message: "تم حذف الحجم بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
