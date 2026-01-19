import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export function usePagination<T>({
  queryKey,
  queryFn,
}: {
  queryKey: string[] | (string | number)[];
  queryFn: (page: number) => Promise<Pagination<T>>;
}) {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<T[]>([]);
  const [pages, setPages] = useState(0);
  const { data, isFetching, isLoading } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: async () => {
      const result = await queryFn(page);
      setPages(result.totalPages);
      setItems((prevItems) => [...prevItems, ...result.content]);
      return result;
    },
    initialData: {} as Pagination<T>,
  });
  const hasMore = !data?.last;
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return {
    items,
    hasMore,
    loadMore,
    setItems,
    setPage,
    pages,
    page,
    isLoading: isFetching || isLoading,
  };
}
