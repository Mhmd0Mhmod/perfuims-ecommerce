import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Product } from "@/types/product";

export async function getProductById(id: string): Promise<Product> {
  try {
    const reponse = await authFetcher.get(`/products/${id}`);
    return reponse.data;
  } catch (error) {
    throw throwingError(error);
  }
}
