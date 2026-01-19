import { fetcher } from "@/lib/fetcher";
import { Category } from "@/types/category";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookies = request.cookies;
    const countryCode = cookies.get("country")?.value;
    const response = await fetcher.get<Category[]>("/categories", {
      headers: {
        "X-Country-Code": countryCode,
      },
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch categories" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
