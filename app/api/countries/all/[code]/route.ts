import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string[] }> },
) {
  try {
    const { code } = await params;
    const response = await axios.get<PublicCountry>(
      `https://restcountries.com/v3.1/alpha?fields=name,flag,currencies,cca2&fullText=true&codes=${code.join(",")}`,
    );
    return NextResponse.json(response.data, {
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
