"use server";

import axiosInstance from "@/lib/axios";
import { ErrorResponse } from "@/lib/utils";
import { AddCountrySchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

export async function addCountry(data: AddCountrySchema): Promise<ApiResponse<Country>> {
  try {
    const response = await axiosInstance.post<Country>("admin/countries", data);
    revalidatePath("/admin/countries");
    return {
      data: response.data,
      status: response.status,
      message: "تمت إضافة الدولة بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateCountry(
  countryId: number,
  data: Partial<AddCountrySchema>,
): Promise<ApiResponse<Country>> {
  try {
    const response = await axiosInstance.patch<Country>(`admin/countries/${countryId}`, data);
    revalidatePath(`/admin/countries/${countryId}`);
    revalidatePath("/admin/countries");
    return {
      data: response.data,
      status: response.status,
      message: "تم تحديث بيانات الدولة بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
export async function deleteCountry(countryId: number): Promise<ApiResponse> {
  try {
    const respone = await axiosInstance.delete(`admin/countries/${countryId}`);
    revalidatePath("/admin/countries");
    return {
      status: respone.status,
      message: "تم حذف الدولة بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
