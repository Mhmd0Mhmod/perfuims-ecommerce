import axiosInstance from "@/lib/axios";
import { throwingError } from "@/lib/utils";

export async function getAdminSizes(): Promise<Size[]> {
  try {
    const { data } = await axiosInstance.get<Size[]>("admin/sizes");
    return data;
  } catch (error) {
    console.dir(error);

    throw throwingError(error);
  }
}
