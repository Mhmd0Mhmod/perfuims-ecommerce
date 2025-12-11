import axiosInstance from "@/lib/axios";
import { throwingError } from "@/lib/utils";
import { Size } from "@/types/size";

export async function getAdminSizes(): Promise<Size[]> {
  try {
    const { data } = await axiosInstance.get<Size[]>("admin/sizes");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
