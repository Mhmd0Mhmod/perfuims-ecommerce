import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await authFetcher.get<Category[]>("/admin/categories");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}
