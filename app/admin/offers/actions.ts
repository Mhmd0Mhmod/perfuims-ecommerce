"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { DiscountType } from "@/types/offer";
import { revalidatePath } from "next/cache";

interface OfferFormData {
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export async function createOffer(data: OfferFormData): Promise<ApiResponse> {
  try {
    const response = await authFetcher.post("admin/offers", data);
    revalidatePath("/admin/offers");

    return {
      status: response.status,
      success: true,
      message: "تم إنشاء العرض بنجاح",
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateOffer(id: number, data: OfferFormData): Promise<ApiResponse> {
  try {
    const response = await authFetcher.patch(`admin/offers/${id}`, data);
    revalidatePath(`/admin/offers/${id}`);
    return {
      success: true,
      message: "تم تحديث العرض بنجاح",
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteOffer(id: number): Promise<ApiResponse> {
  try {
    await authFetcher.delete(`admin/offers/${id}`);
    revalidatePath("/admin/offers");
    return {
      success: true,
      message: "تم حذف العرض بنجاح",
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function toggleOfferStatus(id: number, isActive: boolean): Promise<ApiResponse> {
  try {
    await authFetcher.patch(`admin/offers/${id}/status`, { isActive });
    revalidatePath("/admin/offers");
    return {
      success: true,
      message: isActive ? "تم تفعيل العرض بنجاح" : "تم إلغاء تفعيل العرض بنجاح",
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
