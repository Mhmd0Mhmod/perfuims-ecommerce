import { ProductsState } from "@/context/ProductsContext";
import { throwingError } from "@/lib/utils";
import { Product } from "@/types/product";
import { getCountryFlag } from "../admin/countries/helpers";
import { publicAxios } from "@/lib/axios-client";

export async function getAllCategories() {
  try {
    const response = await publicAxios.get<Category[]>("/categories");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getProducts(params: Partial<ProductsState>): Promise<Pagination<Product>> {
  try {
    const response = await publicAxios.get<Pagination<Product>>("/products", {
      params: {
        ...params,
        q: params?.searchTerm || "",
      },
    });
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getCountries() {
  try {
    const response = await publicAxios.get<Country[]>("/countries");
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

export async function getCountryByCode(code: string) {
  try {
    const response = await publicAxios.get<Country[]>(`/countries`);
    const country = response.data.find((c) => c.code === code);
    if (!country) {
      throw new Error("Country not found");
    }
    const flagUrl = (await getCountryFlag(country.name)) || "/placeholder-flag.svg";
    const countryWithFlag = { ...country, flagUrl };
    return countryWithFlag;
  } catch (error) {
    throw throwingError(error);
  }
}
