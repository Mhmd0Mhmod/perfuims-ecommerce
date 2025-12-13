import { getToken } from "@/app/(auth)/action";
import axios from "axios";
import { cookies } from "next/headers";
async function AxiosServerInstance() {
  const cookiesStore = await cookies();
  const countryCode = cookiesStore.get("country")?.value;
  const token = await getToken();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_RAILWAY_API,
    headers: {
      "Content-Type": "application/json",
      "X-Country-Code": countryCode || "",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return instance;
}

export default AxiosServerInstance;
