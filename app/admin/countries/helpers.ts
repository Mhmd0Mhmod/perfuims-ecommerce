"use server";
import { getCookies } from "@/app/(auth)/action";
import { publicAxios } from "@/lib/axios-client";
import AxiosServerInstance from "@/lib/axios-server";
import { throwingError } from "@/lib/utils";
import axios from "axios";

export async function getAdminCountries() {
  try {
    const axiosInstance = await AxiosServerInstance();
    const response = await axiosInstance.get<Country[]>("admin/countries");
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

export async function getAllCountries() {
  try {
    const { data } = await axios.get<
      {
        id: number;
        name: {
          common: string;
        };
        currencies: Record<string, unknown>;
        flags: { svg: string };
        cca2: string;
      }[]
    >("https://restcountries.com/v3.1/all?fields=name,flags,currencies,cca2");
    return data;
  } catch {
    return [];
  }
}
export async function getCountryFlag(countryName: string) {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=flags`,
    );
    const countryData = response.data;
    if (Array.isArray(countryData) && countryData.length > 0) {
      return countryData[0].flags.svg;
    }
    return null;
  } catch {
    return "/placeholder-flag.svg";
  }
}

export async function getCurrentCountry(): Promise<Country | null> {
  try {
    const code = await getCookies("country");
    const response = await publicAxios.get<Country[]>(`/countries`);
    const countries = response.data;
    const country = countries.find((c) => c.code === code);
    return country || countries.find((country) => country.isDefault) || null;
  } catch {
    return null;
  }
}
