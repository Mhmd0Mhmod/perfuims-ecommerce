"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { OrderStatus } from "@/types/order";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<ApiResponse> {
  try {
    await authFetcher.patch(
      `/admin/orders/${orderId}/status`,
      {},
      {
        params: {
          status,
        },
      },
    );
    revalidatePath("/admin/orders");
    return {
      success: true,
      status: 200,
      message: "تم تحديث حالة الطلب بنجاح",
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function cancelOrder(orderId: string): Promise<ApiResponse> {
  try {
    await authFetcher.patch(`/admin/orders/${orderId}/status`, { status: "CANCELLED" });
    revalidatePath("/admin/orders");
    return {
      success: true,
      status: 200,
      message: "تم إلغاء الطلب بنجاح",
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
