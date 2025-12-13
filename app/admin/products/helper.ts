import { ProductsState } from "@/context/ProductsContext";
import AxiosServerInstance from "@/lib/axios-server";
import { throwingError } from "@/lib/utils";
import { Product } from "@/types/product";

export async function getAdminProducts(
  params?: Partial<ProductsState>,
): Promise<Pagination<Product>> {
  try {
    const axiosInstance = await AxiosServerInstance();

    const { data } = await axiosInstance.get<Pagination<Product>>("admin/products", {
      params: {
        ...params,
        q: params?.searchTerm || "",
      },
    });

    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
