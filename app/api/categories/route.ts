import { CategoryAPI } from "@/lib/api/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookies = request.cookies;
    const countryCode = cookies.get("country")?.value;
    const data = await CategoryAPI.getAllCategoriesServer(countryCode);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
