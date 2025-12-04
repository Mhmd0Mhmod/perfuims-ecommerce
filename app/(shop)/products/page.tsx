import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3x3, List } from "lucide-react";
import ProductFilters from "@/components/products/ProductFilters";
import ProductCard from "@/components/products/ProductCard";

export default function ProductsPage() {
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
    {
      id: 5,
      name: "عطر الزعفران الذهبي",
      price: "920 ريال",
      rating: 4.8,
      reviews: 67,
      inStock: false,
    },
    {
      id: 6,
      name: "عطر اللافندر الفرنسي",
      price: "340 ريال",
      originalPrice: "450 ريال",
      rating: 4.6,
      reviews: 112,
      inStock: true,
    },
    {
      id: 7,
      name: "عطر العنبر الشرقي",
      price: "680 ريال",
      originalPrice: "890 ريال",
      rating: 4.7,
      reviews: 145,
      badge: "خصم 25%",
      inStock: true,
    },
    {
      id: 8,
      name: "عطر الفانيليا الحلوة",
      price: "420 ريال",
      rating: 4.5,
      reviews: 98,
      inStock: true,
    },
  ];

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
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">عرض {products.length} منتج</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* View Toggle */}
          <div className="flex items-center gap-2 rounded-md border p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort By */}
          <Select defaultValue="popular">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">الأكثر شعبية</SelectItem>
              <SelectItem value="newest">الأحدث</SelectItem>
              <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
              <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
              <SelectItem value="rating">الأعلى تقييماً</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <ProductFilters />
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button variant="outline" disabled>
              السابق
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">التالي</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
