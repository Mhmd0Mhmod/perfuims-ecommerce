import { Category } from "@/types/category";
import axios from "@/lib/axios";
import { authFetcher } from "../authFetcher";
import { fetcher } from "../fetcher";
import { throwingError } from "../utils";

export class CategoryAPI {
  static async getAllCategories() {
    try {
      const response = await axios.get<Category[]>("/api/categories");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }

  static async getAdminCategories(): Promise<Category[]> {
    try {
      const response = await authFetcher.get<Category[]>("/admin/categories");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAllCategoriesServer(): Promise<Category[]> {
    try {
      const response = await fetcher.get<Category[]>("/categories");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
