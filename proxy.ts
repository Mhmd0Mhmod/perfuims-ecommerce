import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "./lib/fetcher";
import { Country } from "./types/country";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const countryCode = request.cookies.get("country")?.value;
  const response = NextResponse.next();
  if (!countryCode) {
    const { data } = await fetcher.get<Country[]>("/countries", {
      fetchOptions: {
        next: {
          revalidate: 86400, // 24 hours
        },
      },
    });

    const defaultCountry = data.find((c: Country) => c.isDefault);
    if (defaultCountry) {
      response.cookies.set("country", defaultCountry.code);
    } else {
      response.cookies.set("country", data.at(0)!.code);
    }
  } else {
    response.cookies.set("country", countryCode);
  }
  const session = await auth();
  if (session) {
    return response;
  }
  const redirectResponse = NextResponse.rewrite(new URL("/login", request.url));
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });
  return redirectResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
