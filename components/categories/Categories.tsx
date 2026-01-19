import { Badge } from "../ui/badge";
import CategoriesGrid from "./CategoriesGrid";

function Categories() {
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

        {/* Categories Grid - Features Style */}
        <CategoriesGrid />
      </div>
    </section>
  );
}

export default Categories;
