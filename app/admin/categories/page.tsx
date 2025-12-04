import { AddCategoryDialog } from "@/components/admin/categories/AddCategoryDialog";
import { CategoryCard } from "@/components/admin/categories/CategoryCard";
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
import { Suspense } from "react";
import { getCategories } from "./helper";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
async function CategoriesPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">التصنيفات</h1>
          <p className="text-muted-foreground">إدارة تصنيفات المنتجات</p>
        </div>
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
            <AddCategoryDialog />
          </DialogContent>
        </Dialog>
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
  const data = await getCategories();
  const categories = data.content;
  if (categories.length === 0) {
    <Card>
      <CardHeader>
        <CardTitle>لا توجد تصنيفات</CardTitle>
        <CardDescription>ابدأ بإضافة تصنيف جديد باستخدام الزر أعلاه</CardDescription>
      </CardHeader>
    </Card>;
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="text-muted-foreground text-center text-sm">
            إجمالي التصنيفات: {data?.totalElements || 0}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
export default CategoriesPage;
