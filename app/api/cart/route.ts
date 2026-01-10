import { auth } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requet: NextRequest) {
  try {
    const session = await auth();
    if (!session?.token) {
      return NextResponse.json({ error: "المستخدم غير مصرح له." }, { status: 401 });
    }

    const countryCode = requet.cookies.get("country")?.value;
    const response = await fetcher.get("/cart", {
      headers: {
        Authorization: `Bearer ${session.token}`,
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
