import axiosInstance from "@/lib/axios";
import axios from "axios";

export async function getCountries() {
  try {
    const response = await axiosInstance.get<Pagination<Country>>("admin/countries");
    return response.data;
  } catch (error) {
    throw error;
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
      }[]
    >("https://restcountries.com/v3.1/all?fields=name,flags,currencies");
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
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
