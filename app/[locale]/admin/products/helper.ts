import { ProductsState } from "@/context/ProductsContext";
import axiosInstance from "@/lib/axios";
import { throwingError } from "@/lib/utils";
import { Product } from "@/types/product";

export async function getAdminProducts(
  params?: Partial<ProductsState> & { countryId?: number },
): Promise<Pagination<Product>> {
  try {
    const { data } = await axiosInstance.get<Pagination<Product>>("admin/products", {
      params: {
        ...params,
        q: params?.searchTerm,
      },
    });
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
