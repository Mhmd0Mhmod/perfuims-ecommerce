import { Size } from "@/types/size";
import { authFetcher } from "../authFetcher";
import { throwingError } from "../utils";

export class SizeAPI {
  static async getAdminSizes(): Promise<Size[]> {
    try {
      const { data } = await authFetcher.get<Size[]>("/admin/sizes");
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
