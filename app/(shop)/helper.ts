import { ProductsState } from "@/context/ProductsContext";
import { fetcher } from "@/lib/fetcher";
import { throwingError } from "@/lib/utils";
import { Category } from "@/types/category";
import { Country, PublicCountry } from "@/types/country";
import { Offer } from "@/types/offer";
import { Product } from "@/types/product";
import axios from "axios";

export async function getAllCategories() {
  try {
    const response = await axios.get<Category[]>("/api/categories");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getProducts(params: Partial<ProductsState>): Promise<Pagination<Product>> {
  try {
    const response = await axios.get<Pagination<Product>>("/api/products", {
      params,
    });
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getCountries() {
  try {
    const response = await axios.get<PublicCountry[]>("/api/countries/all");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}
export async function getCountriesServer() {
  try {
    const response = await fetcher.get<Country[]>("/countries");

    if (!response.data || response.data.length === 0) {
      return [];
    }

    const { data: countriesPublic } = await axios.get<PublicCountry[]>(
      `https://restcountries.com/v3.1/alpha?fields=name,flag,currencies,cca2&fullText=true&codes=${response.data.map((country) => country.code).join(",")}`,
      {
        fetchOptions: {
          cache: "force-cache",
        },
      },
    );
    return countriesPublic;
  } catch (error) {
    console.error("Error in getCountriesServer:", error);
    return [];
  }
}

export async function getCountryByCode(code: string) {
  try {
    const { data } = await axios.get<Country>(`/api/countries/${code}`);
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
export async function getOffers() {
  try {
    const { data } = await axios.get<Offer[]>("/api/offers");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
