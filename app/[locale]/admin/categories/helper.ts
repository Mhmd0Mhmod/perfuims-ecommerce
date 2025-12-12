import axiosInstance from "@/lib/axios";
import { throwingError } from "@/lib/utils";

export async function getCategories(countryId?: number): Promise<Category[]> {
  try {
    const response = await axiosInstance.get<Category[]>("admin/categories", {
      params: { countryId },
    });
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}
