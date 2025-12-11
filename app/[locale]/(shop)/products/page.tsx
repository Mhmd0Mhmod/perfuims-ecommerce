import ProductFilters from "@/components/products/ProductFilters";
import ProductsGrid from "@/components/products/ProductsGrid";
import { Badge } from "@/components/ui/badge";
import { ProductsProvider } from "@/context/ProductsContext";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <Badge className="bg-primary">جميع المنتجات</Badge>
        </div>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          استكشف <span className="text-primary">عالم العطور</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          اكتشف مجموعتنا الكاملة من العطور الفاخرة والمميزة
        </p>
      </div>

      {/* Filters and Controls */}
      <ProductsProvider>
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>

          {/* Products Grid */}

          <main className="space-y-4 lg:col-span-3">
            <ProductsGrid />
          </main>
        </div>
      </ProductsProvider>
    </div>
  );
}
