import Link from "next/link";
import ProductCard from "../products/ProductCard";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "عطر الورد الفاخر",
      price: "450 ريال",
      originalPrice: "600 ريال",
      rating: 4.8,
      reviews: 124,
      badge: "الأكثر مبيعاً",
      inStock: true,
    },
    {
      id: 2,
      name: "عطر العود الملكي",
      price: "850 ريال",
      originalPrice: "1200 ريال",
      rating: 4.9,
      reviews: 89,
      badge: "جديد",
      inStock: true,
    },
    {
      id: 3,
      name: "عطر الياسمين الشرقي",
      price: "380 ريال",
      originalPrice: "500 ريال",
      rating: 4.7,
      reviews: 156,
      badge: "خصم 30%",
      inStock: true,
    },
    {
      id: 4,
      name: "عطر المسك الأبيض",
      price: "520 ريال",
      originalPrice: "750 ريال",
      rating: 4.9,
      reviews: 203,
      badge: "الأكثر مبيعاً",
      inStock: true,
    },
  ];

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">عرض جميع المنتجات</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
