import { ProductsState } from "@/context/ProductsContext";
import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Product } from "@/types/product";

export async function getAdminProducts(
  params?: Partial<ProductsState> & {
    displayAll: boolean;
  },
): Promise<Pagination<Product> | Product[]> {
  try {
    const { data } = await authFetcher.get<Product[] | Pagination<Product>>("/admin/products", {
      params,
    });
    if (params?.displayAll) {
      return data as Product[];
    }
    return data as Pagination<Product>;
  } catch (error) {
    throw throwingError(error);
  }
}
