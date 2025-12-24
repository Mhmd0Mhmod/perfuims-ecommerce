import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await axios.get<PublicCountry[]>(
      "https://restcountries.com/v3.1/all?fields=name,flag,currencies,cca2&fullText=true",
    );

    return NextResponse.json(response.data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
