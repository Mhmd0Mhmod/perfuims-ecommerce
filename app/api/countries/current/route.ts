import { fetcher } from "@/lib/fetcher";
import { Country } from "@/types/country";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const code = request.cookies.get("country_code")?.value;
    const { data } = await fetcher.get<Country[]>(`/countries`);
    const country = data.find((country) => country.code === code);
    return NextResponse.json(country, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch country" }, { status: 500 });
  }
}
