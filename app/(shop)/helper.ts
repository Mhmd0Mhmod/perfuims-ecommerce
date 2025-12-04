import { publicAxiosInstance } from "@/lib/axios";

export async function getAllCategories() {
  try {
    const response = await publicAxiosInstance.get<Pagination<Category>>("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
}
