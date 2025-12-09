import axiosInstance from "@/lib/axios";
import { Product } from "@/types/product";

export async function getAdminProducts(): Promise<Pagination<Product>> {
  try {
    const { data } = await axiosInstance.get<Pagination<Product>>("admin/products");
    return data;
  } catch (error) {
    throw error;
  }
}
