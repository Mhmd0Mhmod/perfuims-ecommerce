import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { fetcher } from "@/lib/fetcher";
import { Category } from "@/types/category";

export async function GET(request: NextRequest) {
  try {
    const { data } = await fetcher.get<Category[]>("/admin/categories", {
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
