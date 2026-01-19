"use server";
import { cookies } from "next/headers";

export async function getCookies(cookie: string) {
  const cookiesStore = await cookies();
  return cookiesStore.get(cookie)?.value;
}
