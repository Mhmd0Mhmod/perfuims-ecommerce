"use server";

import AxiosServerInstance from "@/lib/axios-server";
import { ErrorResponse } from "@/lib/utils";
import { CartItem } from "@/types/cart";
import { revalidateTag } from "next/cache";

export async function getCart(): Promise<CartItem[]> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.get("/cart");
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
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.post("/cart", {
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
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.delete(`/cart/${productVariantId}`);
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
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.patch(`/cart/${productVariantId}`, {
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
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.delete("/cart");
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
