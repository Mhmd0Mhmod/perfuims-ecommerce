import { getAllCategories } from "@/app/(shop)/helper";
import { useQuery } from "@tanstack/react-query";
export function useCategories() {
  const query = useQuery({
    queryKey: ["categories-home"],
    queryFn: getAllCategories,
    staleTime: "static",
  });
  return query;
}
