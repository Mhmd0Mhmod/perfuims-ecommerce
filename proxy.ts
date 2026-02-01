import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "./lib/fetcher";
import { Country } from "./types/country";
import { auth } from "./lib/auth";
import { COOKIES } from "./constants/Cookies";
const PROTECTED_PATHS = ["/account", "/admin"];
export async function proxy(request: NextRequest) {
  const countryCode = request.cookies.get(COOKIES.COUNTRY)?.value;
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
      response.cookies.set(COOKIES.COUNTRY, defaultCountry.code);
    } else {
      response.cookies.set(COOKIES.COUNTRY, data.at(0)!.code);
    }
  } else {
    response.cookies.set(COOKIES.COUNTRY, countryCode);
  }

  if (!PROTECTED_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))) return response;

  const session = await auth();
  if (session) return response;

  const redirectResponse = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });
  return redirectResponse;
}
