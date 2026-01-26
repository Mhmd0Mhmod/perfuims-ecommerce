"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import {
  AddCategorySchema,
  AddCountrySchema,
  AddProductSchema,
  AddSizeSchema,
  StoreSettingsSchema,
} from "@/lib/zod";
import { Category } from "@/types/category";
import { Country } from "@/types/country";
import { DiscountType } from "@/types/offer";
import { OrderStatus, PaymentStatus } from "@/types/order";
import { Product } from "@/types/product";
import { Size } from "@/types/size";
import { revalidatePath } from "next/cache";

export async function addCategory(data: AddCategorySchema): Promise<ApiResponse<Category>> {
  try {
    const response = await authFetcher.post<Category>("admin/categories", data);
    revalidatePath("/admin/categories");
    return {
      data: response.data,
      status: response.status,
      message: "تمت إضافة التصنيف بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateCategory(
  categoryId: number,
  data: Partial<AddCategorySchema>,
): Promise<ApiResponse<Category>> {
  try {
    const response = await authFetcher.patch<Category>(`admin/categories/${categoryId}`, data);
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath("/admin/categories");
    return {
      data: response.data,
      status: response.status,
      message: "تم تحديث بيانات التصنيف بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteCategory(categoryId: number): Promise<ApiResponse> {
  try {
    const response = await authFetcher.delete(`admin/categories/${categoryId}`);
    revalidatePath("/admin/categories");
    return {
      status: response.status,
      message: "تم حذف التصنيف بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function addCountry(data: AddCountrySchema): Promise<ApiResponse<Country>> {
  try {
    const response = await authFetcher.post<Country>("admin/countries", data);
    revalidatePath("/admin/countries");
    return {
      data: response.data,
      status: response.status,
      message: "تمت إضافة الدولة بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateCountry(
  countryId: number,
  data: Partial<AddCountrySchema>,
): Promise<ApiResponse<Country>> {
  try {
    const response = await authFetcher.patch<Country>(`admin/countries/${countryId}`, data);
    revalidatePath(`/admin/countries/${countryId}`);
    revalidatePath("/admin/countries");
    return {
      data: response.data,
      status: response.status,
      message: "تم تحديث بيانات الدولة بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteCountry(countryId: number): Promise<ApiResponse> {
  try {
    const respone = await authFetcher.delete(`admin/countries/${countryId}`);
    revalidatePath("/admin/countries");
    return {
      status: respone.status,
      message: "تم حذف الدولة بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteCustomerAction(customerId: number | string) {
  try {
    await authFetcher.delete(`admin/users/${customerId}`);
    revalidatePath("/admin/customers");
  } catch (error) {
    return ErrorResponse(error);
  }
}

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
      data: response.data,
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

export async function updateStoreSettingsAction(
  formData: StoreSettingsSchema,
): Promise<ApiResponse> {
  try {
    const response = await authFetcher.put("admin/settings", formData);
    revalidatePath("/admin/settings");
    return {
      success: true,
      data: response.data,
      message: "تم تحديث إعدادات المتجر بنجاح",
      status: response.status,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function addSize(data: AddSizeSchema): Promise<ApiResponse<Size>> {
  try {
    const response = await authFetcher.post<Size>("admin/sizes", data);
    revalidatePath("/admin/sizes");
    return {
      data: response.data,
      status: response.status,
      message: "تمت إضافة الحجم بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateSize(
  sizeId: string,
  data: Partial<AddSizeSchema>,
): Promise<ApiResponse<Size>> {
  try {
    const response = await authFetcher.patch<Size>(`admin/sizes/${sizeId}`, data);
    revalidatePath("/admin/sizes");
    return {
      data: response.data,
      status: response.status,
      message: "تم تحديث بيانات الحجم بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function deleteSize(sizeId: string): Promise<ApiResponse> {
  try {
    const response = await authFetcher.delete(`admin/sizes/${sizeId}`);
    revalidatePath("/admin/sizes");
    return {
      status: response.status,
      message: "تم حذف الحجم بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
