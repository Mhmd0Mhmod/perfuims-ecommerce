import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { fetcher } from "@/lib/fetcher";

export async function GET(request: NextRequest) {
  try {
    const countryCode = request.cookies.get("country")?.value;
    const { data } = await fetcher.get<Category[]>("/admin/categories", {
      headers: {
        "X-Country-Code": countryCode,
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
