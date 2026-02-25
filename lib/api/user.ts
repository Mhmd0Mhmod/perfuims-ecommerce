import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Customer } from "@/types/customer";
import { Pageable, PaginationParams } from "@/types/pageable";
export class UserAPI {
  static async getUsers(params?: PaginationParams) {
    try {
      const { data } = await authFetcher.get<Pageable<Customer>>("/admin/users", { params });
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getUser(id: string) {
    try {
      const { data } = await authFetcher.get<Customer>(`/admin/users/${id}`);
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
