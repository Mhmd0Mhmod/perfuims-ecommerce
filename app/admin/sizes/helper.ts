import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Size } from "@/types/size";

export async function getAdminSizes(): Promise<Size[]> {
  try {
    const { data } = await authFetcher.get<Size[]>("/admin/sizes");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
