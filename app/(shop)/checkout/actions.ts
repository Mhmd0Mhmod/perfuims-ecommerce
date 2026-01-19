"use server";

import { ErrorResponse } from "@/lib/utils";
import { CheckoutSchema } from "@/lib/zod";
import { revalidateTag } from "next/cache";
import { authFetcher } from "@/lib/authFetcher";

export async function createOrderAction(formData: CheckoutSchema): Promise<ApiResponse> {
  try {
    const response = await authFetcher.post("/orders", {
      paymentMethodId: formData.paymentMethodId,
      shippingAddress: formData.address + ", " + formData.city,
      phoneNumber: formData.phoneNumber,
    });
    revalidateTag("cart", "default");
    return {
      success: true,
      data: response.data,
      message: "تم إرسال طلبك بنجاح!",
      status: response.status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
