"use client";

import { deleteCategory } from "@/app/admin/actions";
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
import { Category } from "@/types/category";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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
    <Card className="gap-2">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{category.name}</CardTitle>
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
        <p className="text-muted-foreground text-md">{category.description || "لا يوجد وصف"}</p>
        {category.children && category.children.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">
              التصنيفات الفرعية ({category.children.length}):
            </h4>
            <div className="flex flex-wrap gap-1">
              {category.children.map((sub) => (
                <Badge key={sub.id} variant="secondary" className="text-[10px]">
                  {sub.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex justify-end gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/categories/${category.id}/edit`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
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
