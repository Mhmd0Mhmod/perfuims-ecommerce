import { fetcher } from "@/lib/fetcher";
import { Order } from "@/types/order";
import { AxiosError } from "axios";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || 0;
  const countryCode = request.cookies.get("country")?.value;
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.json(
        {
          error: "غير مصرح",
        },
        {
          status: 401,
        },
      );
    }
    const { data } = await fetcher.get<Pagination<Order>>("/admin/orders", {
      params: {
        page,
      },
      headers: {
        "X-Country-Code": countryCode,
        Authorization: `Bearer ${token.token}`,
      },
    });
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          error: error.response?.data.message,
        },
        {
          status: error.response?.status || 500,
        },
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        },
      );
    }
    return NextResponse.json(
      {
        error: "حدث خطأ",
      },
      {
        status: 500,
      },
    );
  }
}
