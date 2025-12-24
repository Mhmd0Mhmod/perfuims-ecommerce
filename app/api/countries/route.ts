import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data: myCountries } = await fetcher.get<Country[]>("/countries");
    const countriesCodes = myCountries.map((country) => country.code);
    const { data: countries } = await axios.get<{ flag: string; cca2: string }[]>(
      `https://restcountries.com/v3.1/alpha?fields=flag,cca2&codes=${countriesCodes.join(",")}`,
    );

    const result: Country[] = myCountries.map((country) => ({
      id: country.id,
      name: country.name,
      currency: country.currency,
      flag: countries.find((c) => c.cca2 === country.code)!.flag,
      code: country.code,
      isDefault: country.isDefault,
      isActive: country.isActive,
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    }));

    return NextResponse.json(result, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
