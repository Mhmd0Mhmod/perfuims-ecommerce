import { ProductsState } from "@/context/ProductsContext";
import { Product } from "@/types/product";
import axios from "axios";
import { throwingError } from "../utils";
import { authFetcher } from "../authFetcher";
import { fetcher } from "../fetcher";

export class ProductAPI {
  static async getProducts(params: Partial<ProductsState>): Promise<Pagination<Product>> {
    try {
      const response = await axios.get<Pagination<Product>>("/api/products", {
        params,
      });
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getProductsServer(
    params: Partial<ProductsState>,
    countryCode?: string,
  ): Promise<Pagination<Product>> {
    try {
      const { data } = await fetcher.get<Pagination<Product>>("/products", {
        params: {
          ...params,
          q: params.searchTerm,
        },
        headers: {
          "X-Country-Code": countryCode,
        },
      });
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getProductById(id: string): Promise<Product> {
    try {
      const reponse = await authFetcher.get(`/products/${id}`);
      return reponse.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAdminProducts(
    params?: Partial<ProductsState> & {
      displayAll: boolean;
    },
  ): Promise<Pagination<Product> | Product[]> {
    try {
      const { data } = await authFetcher.get<Product[] | Pagination<Product>>("/admin/products", {
        params,
      });
      if (params?.displayAll) {
        return data as Product[];
      }
      return data as Pagination<Product>;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
