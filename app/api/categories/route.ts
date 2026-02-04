import { CategoryAPI } from "@/lib/api/category";
import { fetcher } from "@/lib/fetcher";
import { Category } from "@/types/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetcher.get<Category[]>("/categories", {
      headers: {
        Cookie: request.cookies.toString(),
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
