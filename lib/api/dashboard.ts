import { DashboardStats } from "@/types/dashboard";
import { authFetcher } from "../authFetcher";

export class DashboardAPI {
  static async getDashboardStats(year: string) {
    try {
      const { data } = await authFetcher.get<DashboardStats>(`/admin/dashboard/stats`, {
        params: { year },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
