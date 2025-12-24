import { fetcher } from "@/lib/fetcher";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requet: NextRequest) {
  try {
    const token = await getToken({ req: requet, secret: process.env.NEXTAUTH_SECRET });
    const countryCode = requet.cookies.get("country")?.value;
    const response = await fetcher.get("/cart", {
      headers: {
        Authorization: `Bearer ${token?.token}`,
        "X-Country-Code": countryCode,
      },
    });
    return NextResponse.json(response.data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء جلب سلة المشتريات." }, { status: 500 });
  }
}
