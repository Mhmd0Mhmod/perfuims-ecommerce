import { Country, PublicCountry } from "@/types/country";
import axios from "axios";
import { fetcher } from "../fetcher";
import { throwingError } from "../utils";
import { getCookies } from "@/app/(auth)/helper";
import { authFetcher } from "../authFetcher";

export class CountryAPI {
  static async getCountries() {
    try {
      const response = await axios.get<PublicCountry[]>("/api/countries/all");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getCountriesServer() {
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
  static async getCountryByCode(code: string) {
    try {
      const { data } = await axios.get<Country>(`/api/countries/${code}`);
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAdminCountriesServer() {
    try {
      const response = await authFetcher.get<Country[]>("/admin/countries");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }

  static async getAdminCountries() {
    try {
      const response = await axios.get<Country[]>("/api/admin/countries");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getCurrentCountryServer() {
    try {
      const countryCode = await getCookies("country");
      const { data: countries } = await fetcher.get<Country[]>("countries");
      const country = countries.find((country) => country.code === countryCode);
      return country;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
