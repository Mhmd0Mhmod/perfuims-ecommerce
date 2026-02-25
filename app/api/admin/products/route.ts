import { authFetcher } from "@/lib/authFetcher";
import { Pagination } from "@/types/pagination";
import { Product } from "@/types/product";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("searchTerm") || "";
    const page = Number(searchParams.get("page") || 0);
    const categorieIds = searchParams.get("categorieIds") || "";
    const dealIds = searchParams.get("dealIds") || "";

    const { data } = await authFetcher.get<Pagination<Product>>("/admin/products", {
      params: {
        q,
        page,
        categorieIds,
        dealIds,
      },
      headers: {
        Cookie: request.cookies.toString(),
      },
    });
    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.response?.data.message },
        { status: error.response?.status },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }
}
