"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
const getPagesToShow = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "ellipsis", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages,
      );
    }
  }
  return pages;
};
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  searchParams?: Record<string, string | number | boolean>;
}

function PaginationClientInternal({
  totalPages,
  currentPage: controlledPage,
  onPageChange,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use controlled page if provided, otherwise fallback to URL params
  const currentPage = controlledPage ?? (Number(searchParams.get("page")) || 1);

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  };

  return (
    <Pagination className="my-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
            aria-disabled={currentPage <= 1}
            onClick={(e) => currentPage > 1 && handlePageClick(e, currentPage - 1)}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {getPagesToShow({ totalPages, currentPage }).map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
                onClick={(e) => handlePageClick(e, page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"}
            aria-disabled={currentPage >= totalPages}
            onClick={(e) => currentPage < totalPages && handlePageClick(e, currentPage + 1)}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function PaginationClient(props: PaginationProps) {
  return <PaginationClientInternal {...props} />;
}
export function PaginationServer(props: PaginationProps) {
  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={{
              query: { ...props.searchParams, page: props.currentPage - 1 },
            }}
            aria-disabled={props.currentPage <= 1}
            className={
              props.currentPage && props.currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
        {getPagesToShow({ totalPages: props.totalPages, currentPage: props.currentPage }).map(
          (page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={{
                    query: { ...props.searchParams, page: page },
                  }}
                  isActive={props.currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href={{
              query: { ...props.searchParams, page: props.currentPage + 1 },
            }}
            aria-disabled={props.currentPage >= props.totalPages}
            className={
              props.currentPage >= props.totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
