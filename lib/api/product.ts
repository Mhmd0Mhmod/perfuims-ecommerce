import { ProductsState } from "@/context/ProductsContext";
import { Product } from "@/types/product";
import axios from "axios";
import { throwingError } from "../utils";
import { authFetcher } from "../authFetcher";
import { fetcher } from "../fetcher";
import { AddProductSchema } from "../zod";
import { getCookiesToString } from "@/app/actions";

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
  static async getProductsServer(params: Partial<ProductsState>): Promise<Pagination<Product>> {
    try {
      const cookeString = await getCookiesToString();
      const { data } = await fetcher.get<Pagination<Product>>("/products", {
        params: {
          ...params,
          q: params.searchTerm,
        },
        headers: {
          Cookie: cookeString,
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
  static getProductFormData(data: AddProductSchema) {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.categoryIds && data.categoryIds.length > 0) {
      formData.append("categoryIds", JSON.stringify(data.categoryIds));
    }
    if (data.variants && data.variants.length > 0) {
      formData.append("variants", JSON.stringify(data.variants));
    }
    if (data.image) {
      formData.append("image", data.image);
    }
    return formData;
  }
  static checkVariantChanges(
    oldVariants: Product["variants"],
    newVariants: AddProductSchema["variants"],
  ) {
    const toAdd: AddProductSchema["variants"] = [];
    const toUpdate: AddProductSchema["variants"] = [];
    const toDelete: number[] = [];

    // Find added and updated
    newVariants?.forEach((newVariant) => {
      if (!newVariant.id) {
        toAdd.push(newVariant);
        return;
      }

      const oldVariant = oldVariants.find((v) => v.id === newVariant.id);
      if (oldVariant) {
        const isChanged =
          oldVariant.newPrice !== newVariant.price ||
          oldVariant.isAvailable !== newVariant.isAvailable ||
          oldVariant.size !== newVariant.size ||
          oldVariant.unit !== newVariant.unit;

        if (isChanged) {
          toUpdate.push(newVariant);
        }
      }
    });

    // Find deleted
    oldVariants.forEach((oldVariant) => {
      const stillExists = newVariants?.some((nv) => nv.id === oldVariant.id);
      if (!stillExists) {
        toDelete.push(oldVariant.id);
      }
    });

    return { toAdd, toUpdate, toDelete };
  }
}
