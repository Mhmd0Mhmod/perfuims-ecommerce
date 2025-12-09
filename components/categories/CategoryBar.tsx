"use client";
import { useCategories } from "@/hooks/use-categories";
import LinkButton from "../shared/link-button";
import { Skeleton } from "../ui/skeleton";

function CategoryBar() {
  const { data: categories, isFetching } = useCategories();
  if (isFetching) {
    return (
      <div className="flex items-center justify-center gap-6 py-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <nav className="bg-muted/30 w-full border-t">
      <div className="container mx-auto px-4">
        <div className="scrollbar-hide flex items-center justify-center gap-6 overflow-x-auto py-3">
          {categories?.map((category) => (
            <LinkButton
              key={category.name}
              href={`/products?category=${category.id}`}
              className="hover:text-primary whitespace-nowrap text-black"
            >
              {category.name}
            </LinkButton>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default CategoryBar;
