import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Roles } from "./types/roles";
import { getUser } from "./app/(auth)/action";

export const proxy = auth(async (request) => {
  const user = await getUser();
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin")) {
    if (!user) return NextResponse.redirect(new URL("/login", request.url));
    if (user.role !== Roles.ADMIN) return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});
