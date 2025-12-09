import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import ProductsGrid from "./ProductsGrid";

function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4">المنتجات المميزة</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            اكتشف <span className="text-primary">أفضل العطور</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            مجموعة مختارة بعناية من أفضل العطور الفاخرة والمميزة
          </p>
        </div>

        {/* Products Grid */}
        <ProductsGrid limit={4} />

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/products">عرض جميع المنتجات</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
