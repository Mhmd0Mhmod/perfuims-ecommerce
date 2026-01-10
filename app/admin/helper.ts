import { authFetcher } from "@/lib/authFetcher";
import { DashboardStats } from "@/types/dashboard";

export async function getDashboardStats(year: string) {
  try {
    const { data } = await authFetcher.get<DashboardStats>(`/admin/dashboard/stats`, {
      params: { year },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
