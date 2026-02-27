"use server";

import { authFetcher } from "@/lib/authFetcher";
import { CheckoutSchema, UpdateProfileSchema } from "@/lib/zod";
import { APIResponse, IAPIResponse } from "@/types/api";
import { CartItem } from "@/types/cart";
import { AppliedCouponResponse } from "@/types/offer";
import { Order } from "@/types/order";
import { revalidatePath, revalidateTag } from "next/cache";

export async function validateCouponAction(
  code: string,
): Promise<IAPIResponse<AppliedCouponResponse>> {
  try {
    const response = await authFetcher.post<AppliedCouponResponse>(`/coupons/apply`, { code });
    return APIResponse.success<AppliedCouponResponse>(response.data, "تم تطبيق الكوبون بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function updateProfileAction(formData: UpdateProfileSchema): Promise<IAPIResponse> {
  try {
    await authFetcher.patch("/users/profile", formData);
    revalidatePath("/account/settings");
    return APIResponse.success<void>(undefined, "تم تحديث الملف الشخصي بنجاح");
  } catch (error) {
    return APIResponse.error(error);
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
}): Promise<IAPIResponse<CartItem>> {
  try {
    const response = await authFetcher.post("/cart", {
      productVariantId,
      quantity,
    });
    revalidateTag("cart", "default");
    return APIResponse.success<CartItem>(response.data, "تم إضافة المنتج بنجاح إلى السله");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function removeFromCart(productVariantId: number): Promise<IAPIResponse> {
  try {
    await authFetcher.delete(`/cart/${productVariantId}`);
    revalidateTag("cart", "default");
    return APIResponse.success<CartItem>(undefined, "تم إزالة المنتج بنجاح من السله");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function editCartItem(
  productVariantId: number,
  quantity: number,
): Promise<IAPIResponse> {
  try {
    const response = await authFetcher.patch(`/cart/${productVariantId}`, {
      quantity,
    });
    revalidateTag("cart", "default");

    return APIResponse.success<CartItem>(response.data, "تم تعديل المنتج بنجاح في السله");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function clearCart(): Promise<IAPIResponse> {
  try {
    await authFetcher.delete("/cart");
    revalidateTag("cart", "default");
    return APIResponse.success<void>(undefined, "تم تفريغ السله بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function createOrderAction(formData: CheckoutSchema): Promise<IAPIResponse<Order>> {
  try {
    const { data } = await authFetcher.post<Order>("/orders", {
      paymentMethodId: formData.paymentMethodId,
      shippingAddress: formData.address + ", " + formData.city,
      phoneNumber: formData.phoneNumber,
      ...(formData.couponCode ? { couponCode: formData.couponCode } : {}),
    });
    revalidateTag("cart", "default");

    return APIResponse.success<Order>(data, "تم إنشاء الطلب بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}
