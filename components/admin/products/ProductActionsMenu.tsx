"use client";
import { deleteProduct } from "@/app/admin/products/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/product";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AddProductDialog from "./AddProductDialog";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { Separator } from "@/components/ui/separator";
import { Size } from "@/types/size";

interface ProductActionsMenuProps {
  product: Product;
  categories: Category[];
  sizes: Size[];
}

export function ProductActionsMenu({ product, categories, sizes }: ProductActionsMenuProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const handleDelete = async () => {
    const id = toast.loading("جارى حذف المنتج...");
    try {
      const result = await deleteProduct(product.id);
      if (result.success) {
        toast.success(result.message || "تم حذف المنتج بنجاح", { id });
        setShowDeleteAlert(false);
      } else {
        toast.error(result.message || "حدث خطأ أثناء حذف المنتج", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء حذف المنتج", { id });
    }
  };

  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">فتح القائمة</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowDetailsDialog(true)}>
            <Eye className="h-4 w-4" />
            عرض التفاصيل
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Pencil className="h-4 w-4" />
            تعديل
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setShowDeleteAlert(true)}
          >
            <Trash2 className="h-4 w-4" />
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogClose />
          <DialogHeader className="sm:text-right">
            <DialogTitle>تفاصيل المنتج</DialogTitle>
            <DialogDescription>عرض جميع بيانات المنتج هنا.</DialogDescription>
          </DialogHeader>
          <Separator />
          <ProductDetailsDialog product={product} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl">
          <DialogClose />
          <DialogHeader className="sm:text-right">
            <DialogTitle>تعديل المنتج</DialogTitle>
            <DialogDescription>عدل بيانات المنتج هنا. انقر حفظ عند الانتهاء.</DialogDescription>
          </DialogHeader>
          <AddProductDialog product={product} categories={categories} sizes={sizes} />
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader className="sm:text-right">
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المنتج &quot;{product.name}&quot; نهائياً
              بما في ذلك جميع الأحجام المرتبطة به.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
