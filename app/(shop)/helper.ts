import { ProductsState } from "@/context/ProductsContext";
import { publicAxiosInstance } from "@/lib/axios";
import { throwingError } from "@/lib/utils";
import { Product } from "@/types/product";
import { getCountryFlag } from "../admin/countries/helpers";

export async function getAllCategories() {
  try {
    const response = await publicAxiosInstance.get<Category[]>("/categories");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getProducts(params: Partial<ProductsState>): Promise<Pagination<Product>> {
  try {
    const { countryId, searchTerm, page, fromPrice, toPrice, categorieIds, dealIds } = params;
    const response = await publicAxiosInstance.get<Pagination<Product>>("/products", {
      params: {
        q: searchTerm,
        countryId,
        page,
        fromPrice,
        toPrice,
        categorieIds,
        dealIds,
      },
    });

    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getCountries() {
  try {
    const response = await publicAxiosInstance.get<Country[]>("/countries");
    const countriesWithFlags = await Promise.all(
      response.data.map(async (country: Country) => ({
        ...country,
        flagUrl: (await getCountryFlag(country.name)) || "/placeholder-flag.svg",
      })),
    );

    return countriesWithFlags;
  } catch (error) {
    throw throwingError(error);
  }
}
