import { axiosInstance } from "@/lib/axios-client";
import { throwingError } from "@/lib/utils";
import { Product } from "@/types/product";

export async function getProductById(id: string): Promise<Product> {
  try {
    const reponse = await axiosInstance.get(`/products/${id}`);
    return reponse.data;
  } catch (error) {
    throw throwingError(error);
  }
}
