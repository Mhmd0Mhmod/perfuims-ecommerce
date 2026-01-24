"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { CheckoutSchema, UpdateProfileSchema } from "@/lib/zod";
import { CartItem } from "@/types/cart";
import { Order } from "@/types/order";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateProfileAction(formData: UpdateProfileSchema): Promise<ApiResponse> {
  try {
    const response = await authFetcher.patch("/users/profile", formData);
    revalidatePath("/account/settings");
    return {
      success: true,
      data: response.data,
      message: "تم تحديث البيانات بنجاح",
      status: response.status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function getCart(): Promise<CartItem[]> {
  try {
    const response = await authFetcher.get("/cart");
    revalidateTag("cart", "default");
    return response.data;
  } catch {
    return [];
  }
}

export async function addToCart({
  productVariantId,
  quantity,
}: {
  productVariantId: number;
  quantity: number;
}): Promise<ApiResponse<CartItem>> {
  try {
    const response = await authFetcher.post("/cart", {
      productVariantId,
      quantity,
    });
    revalidateTag("cart", "default");
    return {
      success: true,
      data: response.data,
      message: "تم اضافه المنتج بنجاح للسله",
      status: response.status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function removeFromCart(productVariantId: number) {
  try {
    const response = await authFetcher.delete(`/cart/${productVariantId}`);
    revalidateTag("cart", "default");
    return {
      success: true,
      data: response.data,
      message: "تم حذف المنتج بنجاح من السله",
      status: response.status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function editCartItem(productVariantId: number, quantity: number) {
  try {
    const response = await authFetcher.patch(`/cart/${productVariantId}`, {
      quantity,
    });
    revalidateTag("cart", "default");
    console.log(response);

    return {
      success: true,
      data: response.data,
      message: "تم تعديل المنتج بنجاح في السله",
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return ErrorResponse(error);
  }
}

export async function clearCart() {
  try {
    const response = await authFetcher.delete("/cart");
    revalidateTag("cart", "default");
    return {
      success: true,
      data: response.data,
      message: "تم تفريغ السله بنجاح",
      status: response.status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function createOrderAction(formData: CheckoutSchema): Promise<ApiResponse<Order>> {
  try {
    const { data, status } = await authFetcher.post<Order>("/orders", {
      paymentMethodId: formData.paymentMethodId,
      shippingAddress: formData.address + ", " + formData.city,
      phoneNumber: formData.phoneNumber,
    });
    revalidateTag("cart", "default");

    return {
      success: true,
      data: data,
      message: "تم إرسال طلبك بنجاح!",
      status: status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
