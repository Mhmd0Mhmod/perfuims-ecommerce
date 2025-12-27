"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { AddProductSchema } from "@/lib/zod";
import { Product } from "@/types/product";
import { revalidatePath } from "next/cache";

export async function addProduct(data: AddProductSchema): Promise<ApiResponse<Product>> {
  try {
    const response = await authFetcher.post<Product>("admin/products", data);
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
    if (data.variants && defaultValues?.variants) {
      const { toAdd, toUpdate, toDelete } = checkVariantChanges(
        defaultValues.variants,
        data.variants,
      );
      if (toAdd.length) {
        await authFetcher.post(`admin/product-variants/by-product/${defaultValues.id}`, toAdd);
      }
      if (toUpdate.length) {
        const promises = toUpdate.map((variant) =>
          authFetcher.patch(`admin/product-variants/${variant.id}`, variant),
        );
        await Promise.all(promises);
      }
      if (toDelete.length) {
        const promises = toDelete.map((variantId) =>
          authFetcher.delete(`admin/product-variants/${variantId}`),
        );
        await Promise.all(promises);
      }
    }

    const response = await authFetcher.patch<Product>(`admin/products/${productId}`, data);

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
    const response = await authFetcher.delete(`admin/products/${productId}`);
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
