import { auth, getUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth(async (request) => {
  const user = await getUser();
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin")) {
    if (!user) return NextResponse.redirect(new URL("/login", request.url));
    if (user.role !== "ADMIN") return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});
