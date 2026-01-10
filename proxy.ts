import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "./lib/fetcher";
import { Country } from "./types/country";

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

  return response;
}
