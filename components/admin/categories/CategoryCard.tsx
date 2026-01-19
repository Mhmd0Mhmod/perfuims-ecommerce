"use client";

import { deleteCategory } from "@/app/admin/categories/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@/types/category";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AddCategoryForm } from "./AddCategoryForm";

export function CategoryCard({ category }: { category: Category }) {
  const handleDelete = async () => {
    const id = toast.loading("جارى حذف التصنيف...");
    try {
      const result = await deleteCategory(category.id);
      if (result.success) {
        toast.success(result.message || "تم حذف التصنيف بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء حذف التصنيف", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء حذف التصنيف", { id });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{category.name}</CardTitle>
          </div>
          <CardDescription className="flex flex-col gap-2">
            <Badge variant={category.isActive ? "default" : "secondary"}>
              {category.isActive ? "نشط" : "غير نشط"}
            </Badge>
            {category.isAtHomePage && <Badge variant="outline">عرض بالرئيسية</Badge>}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-muted-foreground text-sm">{category.description || "لا يوجد وصف"}</p>
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">
              التصنيفات الفرعية ({category.subcategories.length}):
            </h4>
            <div className="flex flex-wrap gap-1">
              {category.subcategories.map((sub) => (
                <Badge key={sub.id} variant="secondary" className="text-[10px]">
                  {sub.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل التصنيف</DialogTitle>
              <DialogDescription>عدل بيانات التصنيف هنا. انقر حفظ عند الانتهاء.</DialogDescription>
            </DialogHeader>
            <AddCategoryForm category={category} />
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="sm:text-right">
              <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
              <AlertDialogDescription>
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف التصنيف &quot;{category.name}&quot;
                نهائياً.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>حذف</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
