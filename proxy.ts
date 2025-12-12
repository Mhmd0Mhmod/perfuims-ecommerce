import { NextRequest, NextResponse } from "next/server";
import { getCountries } from "./app/[locale]/(shop)/helper";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) return NextResponse.next();
  const country = request.nextUrl.pathname.split("/")[1];

  const countries = await getCountries();

  const exists = countries.some((c) => c.code === country);
  console.log(country);

  const defaultCountry = countries.find((c) => c.isDefault);
  if (!exists) {
    return NextResponse.redirect(
      new URL(`/${defaultCountry?.code}${request.nextUrl.pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only run on locale routes, exclude auth, account, api, and static files
    "/((?!api|_next|login|register|account|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
