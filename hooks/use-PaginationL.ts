import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export function usePagination<T>({
  queryKey,
  queryFn,
}: {
  queryKey: string[] | (string | number)[];
  queryFn: (page: number) => Promise<Pagination<T>>;
}) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<T[]>([]);
  const { data } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: async () => {
      const result = await queryFn(page);
      setItems((prevItems) => [...prevItems, ...result.content]);
      return result;
    },
    initialData: {} as Pagination<T>,
  });
  const hasMore = !data?.last;
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return { items, hasMore, loadMore, setItems, setPage };
}
