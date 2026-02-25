import { authFetcher } from "@/lib/authFetcher";
import { Pagination } from "@/types/pagination";
import { Payment } from "@/types/payment";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  try {
    const { data } = await authFetcher.get<Pagination<Payment>>("/admin/payments", {
      params: {
        page,
      },
      headers: {
        Cookie: request.cookies.toString(),
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
