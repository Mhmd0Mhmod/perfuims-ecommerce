import { NextRequest, NextResponse } from "next/server";
import { publicAxiosInstance } from "./lib/axios";

export async function proxy(request: NextRequest) {
  const countryCode = request.cookies.get("country")?.value;
  const response = NextResponse.next();
  if (!countryCode) {
    const countries = await publicAxiosInstance.get("/countries", {
      fetchOptions: {
        next: {
          revalidate: 86400, // 24 hours
        },
      },
    });
    const defaultCountry = countries.data.find((c: Country) => c.isDefault);
    response.cookies.set("country", defaultCountry.code);
  } else {
    response.cookies.set("country", countryCode);
  }
  return response;
}
