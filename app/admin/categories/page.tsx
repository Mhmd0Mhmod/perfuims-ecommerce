import { AddCategoryDialog } from "@/components/admin/categories/AddCategoryDialog";
import { CategoryCard } from "@/components/admin/categories/CategoryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { getAdminCountries } from "../countries/helpers";
import { getCategories } from "./helper";
async function AddCategory() {
  const countries = await getAdminCountries();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          إضافة تصنيف
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>إضافة تصنيف جديد</DialogTitle>
          <DialogDescription>
            أدخل بيانات التصنيف الجديد هنا. انقر حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>
        <AddCategoryDialog countries={countries} />
      </DialogContent>
    </Dialog>
  );
}
function CategoriesPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">التصنيفات</h1>
          <p className="text-muted-foreground">إدارة تصنيفات المنتجات</p>
        </div>
        <AddCategory />
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <CategoriesList />
      </Suspense>
    </div>
  );
}

async function CategoriesList() {
  const categories = await getCategories();
  const countries = await getAdminCountries();

  if (categories.length === 0) {
    <Card>
      <CardHeader>
        <CardTitle>لا توجد تصنيفات</CardTitle>
        <CardDescription>ابدأ بإضافة تصنيف جديد باستخدام الزر أعلاه</CardDescription>
      </CardHeader>
    </Card>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} countries={countries} />
      ))}
    </div>
  );
}
export default CategoriesPage;
