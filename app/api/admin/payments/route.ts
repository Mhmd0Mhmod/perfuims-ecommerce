import { auth } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
import { Payment } from "@/types/payment";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || 0;
  const countryCode = request.cookies.get("country_code")?.value;
  try {
    const session = await auth();
    if (!session?.token) {
      return NextResponse.json(
        {
          error: "غير مصرح",
        },
        {
          status: 401,
        },
      );
    }
    const { data } = await fetcher.get<Pagination<Payment>>("/admin/payments", {
      params: {
        page,
      },
      headers: {
        Authorization: `Bearer ${session.token}`,
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
