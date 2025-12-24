import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const code = request.cookies.get("country")?.value;
    const { data } = await axios.get<Country>(`/api/countries/${code}`);
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch country" }, { status: 500 });
  }
}
