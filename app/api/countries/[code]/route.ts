import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await params;
    const { data: myCountries } = await fetcher.get<Country[]>("/countries");
    const response = await axios.get<PublicCountry>(
      `https://restcountries.com/v3.1/alpha/${code}?fields=name,flag,currencies,cca2&fullText=true`,
    );
    const country = myCountries.find((country) => country.code === code);
    return NextResponse.json(
      { ...country, ...response.data },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch country" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
