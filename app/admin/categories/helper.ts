import AxiosServerInstance from "@/lib/axios-server";
import { throwingError } from "@/lib/utils";

export async function getCategories(): Promise<Category[]> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.get<Category[]>("admin/categories");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}
