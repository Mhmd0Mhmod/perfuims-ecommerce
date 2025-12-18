"use server";

import AxiosServerInstance from "@/lib/axios-server";
import { ErrorResponse } from "@/lib/utils";
import { CheckoutSchema } from "@/lib/zod";
import { revalidateTag } from "next/cache";

export async function createOrderAction(formData: CheckoutSchema): Promise<ApiResponse> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.post("/orders", formData);
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
