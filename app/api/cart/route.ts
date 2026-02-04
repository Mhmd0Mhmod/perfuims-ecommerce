import { authFetcher } from "@/lib/authFetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requet: NextRequest) {
  try {
    const response = await authFetcher.get("/cart", {
      headers: {
        Cookie: requet.cookies.toString(),
      },
    });
    return NextResponse.json(response.data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء جلب سلة المشتريات." }, { status: 500 });
  }
}
