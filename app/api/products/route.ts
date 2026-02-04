import { ProductAPI } from "@/lib/api/product";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const countryCode = request.cookies.get("country_code")?.value;
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("searchTerm") || "";
    const page = Number(searchParams.get("page") || 0);
    const categorieIds = searchParams.get("categorieIds")?.split(",") || [];
    const dealIds = searchParams.get("dealIds")?.split(",") || [];
    const data = await ProductAPI.getProductsServer(
      {
        searchTerm: q,
        page,
        categorieIds,
        dealIds,
      },
      countryCode,
    );

    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.response?.data.message }, { status: 400 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }
}
