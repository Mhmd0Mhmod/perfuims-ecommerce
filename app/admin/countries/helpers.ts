import { getCookies } from "@/app/(auth)/helper";
import { authFetcher } from "@/lib/authFetcher";
import { fetcher } from "@/lib/fetcher";
import { throwingError } from "@/lib/utils";
import axios from "axios";

export async function getAdminCountriesServer() {
  try {
    const response = await authFetcher.get<Country[]>("/admin/countries");
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/alpha?fields=name,flag,currencies,cca2&fullText=true&codes=${response.data.map((e) => e.code).join(",")}`,
    );
    return response.data.map((e, i) => {
      return {
        ...e,
        flag: data[i].flag,
      };
    });
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getAdminCountries() {
  try {
    const response = await axios.get<Country[]>("/api/admin/countries");
    return response.data;
  } catch (error) {
    throw throwingError(error);
  }
}
export async function getCurrentCountryServer() {
  try {
    const countryCode = await getCookies("country");
    const { data: countries } = await fetcher.get<Country[]>("countries/");
    const country = countries.find((country) => country.code === countryCode);
    return country;
  } catch (error) {
    throw throwingError(error);
  }
}
