export interface Pageable<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}
export type PaginationParams = {
  page: number;
};
