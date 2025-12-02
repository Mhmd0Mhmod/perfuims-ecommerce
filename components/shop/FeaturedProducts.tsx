import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import Link from "next/link";

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
    },
    {
      id: 2,
      name: "عطر العود الملكي",
      price: "850 ريال",
      originalPrice: "1200 ريال",
      rating: 4.9,
      reviews: 89,
      badge: "جديد",
    },
    {
      id: 3,
      name: "عطر الياسمين الشرقي",
      price: "380 ريال",
      originalPrice: "500 ريال",
      rating: 4.7,
      reviews: 156,
      badge: "خصم 30%",
    },
    {
      id: 4,
      name: "عطر المسك الأبيض",
      price: "520 ريال",
      originalPrice: "750 ريال",
      rating: 4.9,
      reviews: 203,
      badge: "الأكثر مبيعاً",
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
            <Card
              key={product.id}
              className="group overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardHeader className="relative p-0">
                <div className="bg-muted relative flex aspect-square items-center justify-center overflow-hidden">
                  <div className="bg-primary/20 h-32 w-32 rounded-full" />
                  {product.badge && (
                    <Badge className="bg-primary absolute top-4 right-4">{product.badge}</Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 left-4 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 text-right">
                <CardTitle className="mb-2 text-lg">{product.name}</CardTitle>
                <div className="mb-2 flex items-center justify-end gap-2">
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <span>({product.reviews})</span>
                    <span>{product.rating}</span>
                  </div>
                  <Star className="fill-primary text-primary h-4 w-4" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-muted-foreground text-sm line-through">
                    {product.originalPrice}
                  </span>
                  <span className="text-primary text-xl font-bold">{product.price}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/product/${product.id}`}>
                    <ShoppingCart className="ml-2 h-4 w-4" />
                    أضف للسلة
                  </Link>
                </Button>
              </CardFooter>
            </Card>
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
