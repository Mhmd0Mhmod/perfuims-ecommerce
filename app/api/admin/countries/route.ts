import { fetcher } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  try {
    const { data: myCountries } = await fetcher.get<Country[]>("/admin/countries");

    return NextResponse.json(myCountries, {
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
