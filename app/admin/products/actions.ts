"use server";

import { default as AxiosServerInstance } from "@/lib/axios-server";
import { ErrorResponse } from "@/lib/utils";
import { AddProductSchema } from "@/lib/zod";
import { Product } from "@/types/product";
import { revalidatePath } from "next/cache";

export async function addProduct(data: AddProductSchema): Promise<ApiResponse<Product>> {
  try {
    const axiosInstance = await AxiosServerInstance();

    const response = await axiosInstance.post<Product>("admin/products", data);
    revalidatePath("/admin/products");
    return {
      data: response.data,
      status: response.status,
      message: "تمت إضافة المنتج بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

function checkVariantChanges(
  oldVariants: Product["variants"],
  newVariants: AddProductSchema["variants"],
) {
  const toAdd: AddProductSchema["variants"] = [];
  const toUpdate: AddProductSchema["variants"] = [];
  const toDelete: number[] = [];

  // Find added and updated
  newVariants?.forEach((newVariant) => {
    if (!newVariant.id) {
      toAdd.push(newVariant);
      return;
    }

    const oldVariant = oldVariants.find((v) => v.id === newVariant.id);
    if (oldVariant) {
      const isChanged =
        oldVariant.newPrice !== newVariant.price ||
        oldVariant.isAvailable !== newVariant.isAvailable ||
        oldVariant.size !== newVariant.size ||
        oldVariant.unit !== newVariant.unit;

      if (isChanged) {
        toUpdate.push(newVariant);
      }
    }
  });

  // Find deleted
  oldVariants.forEach((oldVariant) => {
    const stillExists = newVariants?.some((nv) => nv.id === oldVariant.id);
    if (!stillExists) {
      toDelete.push(oldVariant.id);
    }
  });

  return { toAdd, toUpdate, toDelete };
}

export async function updateProduct(
  productId: number,
  data: Partial<AddProductSchema>,
  defaultValues?: Product,
): Promise<ApiResponse<Product>> {
  try {
    const axiosInstance = await AxiosServerInstance();

    // If we have variants in data and defaultValues, we can detect changes
    if (data.variants && defaultValues?.variants) {
      const { toAdd, toUpdate, toDelete } = checkVariantChanges(
        defaultValues.variants,
        data.variants,
      );
      if (toAdd.length) {
        const response = await axiosInstance.post(
          `admin/product-variants/by-product/${defaultValues.id}`,
          toAdd,
        );
      }
      if (toUpdate.length) {
        const promises = toUpdate.map((variant) =>
          axiosInstance.patch(`admin/product-variants/${variant.id}`, variant),
        );
        await Promise.all(promises);
      }
      if (toDelete.length) {
        const promises = toDelete.map((variantId) =>
          axiosInstance.delete(`admin/product-variants/${variantId}`),
        );
        await Promise.all(promises);
      }
    }

    const response = await axiosInstance.patch<Product>(`admin/products/${productId}`, data);

    revalidatePath("/admin/products");
    return {
      data: response.data,
      status: response.status,
      message: "تم تحديث بيانات المنتج بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteProduct(productId: number): Promise<ApiResponse> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.delete(`admin/products/${productId}`);
    revalidatePath("/admin/products");
    return {
      status: response.status,
      message: "تم حذف المنتج بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
