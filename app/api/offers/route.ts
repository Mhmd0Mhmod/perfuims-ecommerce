import { fetcher } from "@/lib/fetcher";
import { Offer } from "@/types/offer";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data } = await fetcher.get<Offer[]>("/offers");
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof AxiosError)
      return NextResponse.json(
        {
          error: error.response?.data.message,
        },
        {
          status: error.status,
        },
      );
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
