const BASE_URL = process.env.NEXT_PUBLIC_RAILWAY_API || "http://localhost:3000/api";
export async function fetchGET<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }
  return response.json();
}
