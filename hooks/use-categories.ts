import { CategoryAPI } from "@/lib/api/category";
import { useQuery } from "@tanstack/react-query";
export function useCategories() {
  const query = useQuery({
    queryKey: ["categories-home"],
    queryFn: CategoryAPI.getAllCategories,
  });
  return query;
}
