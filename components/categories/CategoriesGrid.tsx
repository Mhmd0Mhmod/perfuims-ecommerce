"use client";
import { useCategories } from "@/hooks/use-categories";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import CategoriesSkeleton from "./CategoriesSkeleton";

function CategoriesGrid() {
  const { data: categories, isFetching } = useCategories();
  if (isFetching) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories?.map((category) => (
        <Link key={category.id} href={`/products?category=${category.id}`}>
          <Card className="group hover:border-primary border transition-all hover:shadow-lg">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-primary/10 group-hover:bg-primary/20 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors">
                <Sparkles className="text-primary h-7 w-7" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="group-hover:text-primary mb-1 font-bold transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground line-clamp-1 text-sm">{category.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default CategoriesGrid;
