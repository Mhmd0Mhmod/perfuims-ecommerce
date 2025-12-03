import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { getAllCategories } from "@/app/(shop)/helper";

async function Categories() {
  const categories = await getAllCategories();
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4">التصنيفات</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            تسوق حسب <span className="text-primary">التصنيف</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            اختر من مجموعة واسعة من التصنيفات المميزة
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.content.map((category) => (
            <Link key={category.name} href={`/products?category=${category.id}`}>
              <Card className="group hover:border-primary overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-right">
                      <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{category.description}</p>
                    </div>
                    <div className="bg-primary/10 group-hover:bg-primary/20 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                      <div className="bg-primary/20 h-10 w-10 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
