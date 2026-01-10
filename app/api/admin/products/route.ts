import { auth } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@/types/product";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("searchTerm") || "";
    const page = Number(searchParams.get("page") || 0);
    const categorieIds = searchParams.get("categorieIds") || [];
    const dealIds = searchParams.get("dealIds") || [];

    const { data } = await fetcher.get<Pagination<Product>>("/admin/products", {
      params: {
        q,
        page,
        categorieIds,
        dealIds,
      },
      headers: {
        Authorization: `Bearer ${session.token}`,
        "X-Country-Code": request.cookies.get("country")?.value,
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
