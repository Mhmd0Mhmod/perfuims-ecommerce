"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Pencil, Trash2, Package } from "lucide-react";
import { deleteSize } from "@/app/admin/sizes/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddSizeDialog } from "./AddSizeDialog";

export function SizeCard({ size }: { size: Size }) {
  const handleDelete = async () => {
    const id = toast.loading("جارى حذف الحجم...");
    try {
      const result = await deleteSize(size.id);
      if (result.success) {
        toast.success(result.message || "تم حذف الحجم بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء حذف الحجم", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء حذف الحجم", { id });
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <Package className="text-primary h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {size.size} {size.unit}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground space-y-1 text-sm">
          <p>
            <span className="font-semibold">الحجم:</span> {size.size}
          </p>
          <p>
            <span className="font-semibold">الوحدة:</span> {size.unit}
          </p>
          <p className="pt-2 text-xs">
            <span className="font-semibold">تاريخ الإضافة:</span>{" "}
            {new Date(size.createdAt).toLocaleDateString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
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
              <DialogTitle>تعديل الحجم</DialogTitle>
              <DialogDescription>عدل بيانات الحجم هنا. انقر حفظ عند الانتهاء.</DialogDescription>
            </DialogHeader>
            <AddSizeDialog size={size} />
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
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الحجم &quot;{size.size} {size.unit}
                &quot; نهائياً.
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
