"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { PaymentStatus } from "@/types/order";
import { revalidatePath } from "next/cache";

export async function changePaymentStatus(
  paymentId: number,
  status: PaymentStatus,
): Promise<ApiResponse> {
  try {
    const { data } = await authFetcher.patch(
      `/admin/payments/${paymentId}/status`,
      {},
      {
        params: {
          status,
        },
      },
    );
    revalidatePath("/admin/payments");
    return {
      success: true,
      status: 200,
      message: data.message || "تم تحديث حالة الدفع بنجاح",
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
