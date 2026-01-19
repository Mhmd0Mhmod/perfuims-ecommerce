import { fetcher } from "@/lib/fetcher";
import { Country } from "@/types/country";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  try {
    const { code } = await params;
    const { data: myCountries } = await fetcher.get<Country[]>("/countries");
    const country = myCountries.find((country) => country.code === code);
    return NextResponse.json(country, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
