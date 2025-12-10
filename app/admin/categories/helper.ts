import axiosInstance from "@/lib/axios";
import { throwingError } from "@/lib/utils";

export async function getCategories() {
  try {
    const response = await axiosInstance.get<Category[]>("admin/categories");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}
