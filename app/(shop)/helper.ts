import { publicAxiosInstance } from "@/lib/axios";
import { throwingError } from "@/lib/utils";

export async function getAllCategories() {
  try {
    const response = await publicAxiosInstance.get<Pagination<Category>>("/categories");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}
