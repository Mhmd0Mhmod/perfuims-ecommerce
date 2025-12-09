import axiosInstance from "@/lib/axios";
import { throwingError } from "@/lib/utils";

export async function getAdminSizes(): Promise<Pagination<Size>> {
  try {
    const { data } = await axiosInstance.get<Pagination<Size>>("admin/sizes");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
