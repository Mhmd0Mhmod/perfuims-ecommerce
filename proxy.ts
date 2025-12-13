import { NextRequest, NextResponse } from "next/server";
import { publicAxios } from "./lib/axios-client";

export async function proxy(request: NextRequest) {
  const countryCode = request.cookies.get("country")?.value;
  const response = NextResponse.next();
  if (!countryCode) {
    const countries = await publicAxios.get("/countries", {
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

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
