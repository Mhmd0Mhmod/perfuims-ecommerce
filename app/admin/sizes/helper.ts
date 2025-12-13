import AxiosServerInstance from "@/lib/axios-server";
import { throwingError } from "@/lib/utils";
import { Size } from "@/types/size";

export async function getAdminSizes(): Promise<Size[]> {
  try {
    const axiosInstance = await AxiosServerInstance();
    const { data } = await axiosInstance.get<Size[]>("admin/sizes");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
