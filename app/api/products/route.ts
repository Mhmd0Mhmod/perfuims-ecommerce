import { ProductAPI } from "@/lib/api/product";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("searchTerm") || "";
    const page = Number(searchParams.get("page") || 0);
    const categoryIds = searchParams.get("categoryIds")?.split(",") || [];
    const offerIds = searchParams.get("offerIds")?.split(",") || [];

    const data = await ProductAPI.getProductsServer({
      searchTerm: q,
      page,
      categoryIds,
      offerIds,
    });

    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.response?.data.message },
        { status: error.response?.status || 500 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }
}
