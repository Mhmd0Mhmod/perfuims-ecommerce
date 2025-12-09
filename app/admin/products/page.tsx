import ProductDetailsDialog from "@/components/admin/products/ProductDetailsDialog";
import AddProductDialog from "@/components/admin/products/AddProductDialog";
import StatsSkeleton from "@/components/shared/stats-skeleton";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Package, PackageCheck, PackageX, Plus, Search } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { getAdminProducts } from "./helper";
import { getCategories } from "../categories/helper";
import { getAdminSizes } from "../sizes/helper";

async function AddProductDialogButton() {
  const categories = await getCategories();

  const sizes = await getAdminSizes();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          إضافة منتج
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose />
        <DialogHeader className="sm:text-right">
          <DialogTitle>إضافة منتج جديد</DialogTitle>
          <DialogDescription>
            أدخل بيانات المنتج الجديد هنا. انقر حفظ عند الانتهاء.
          </DialogDescription>
        </DialogHeader>

        <AddProductDialog categories={categories.content} sizes={sizes.content} />
      </DialogContent>
    </Dialog>
  );
}

function ProductsPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">المنتجات</h1>
          <p className="text-muted-foreground">إدارة جميع المنتجات والباقات</p>
        </div>
        <AddProductDialogButton />
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsSkeleton length={3} />}>
        <ProductStatsCards />
      </Suspense>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="text-right">
              <CardTitle className="text-2xl font-bold">قائمة المنتجات</CardTitle>
              <CardDescription>عرض وإدارة جميع المنتجات</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
              <Input placeholder="ابحث عن منتج..." className="pr-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={6} rows={8} />}>
            <ProductsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function ProductStatsCards() {
  const data = await getAdminProducts();
  const products = data.content;
  const totalProducts = data.totalElements;
  const packages = products.filter((p) => p.isPackage).length;
  const singleProducts = products.filter((p) => !p.isPackage).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
          <Package className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-muted-foreground text-xs">جميع المنتجات والباقات</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الباقات</CardTitle>
          <PackageCheck className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{packages}</div>
          <p className="text-muted-foreground text-xs">منتجات بأحجام متعددة</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">منتجات فردية</CardTitle>
          <PackageX className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{singleProducts}</div>
          <p className="text-muted-foreground text-xs">منتجات بحجم واحد</p>
        </CardContent>
      </Card>
    </div>
  );
}

async function ProductsTable() {
  const data = await getAdminProducts();
  const products = data.content;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="text-lg font-semibold">لا توجد منتجات</h3>
        <p className="text-muted-foreground text-sm">ابدأ بإضافة منتج جديد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">المنتج</TableHead>
              <TableHead className="text-right">التصنيف</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">تاريخ الإضافة</TableHead>
              <TableHead className="text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={product.imageUrl || "/placeholder-product.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-muted-foreground line-clamp-1 text-xs">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{product.categoryName}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {product.isPackage ? (
                    <Badge className="bg-blue-500">
                      باقة ({product.variants?.length || 0} أحجام)
                    </Badge>
                  ) : (
                    <Badge variant="secondary">منتج فردي</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {product.isPackage ? (
                    <span className="text-muted-foreground text-sm">متعدد</span>
                  ) : (
                    <span>{product.price}</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground text-right text-sm">
                  {formatDate(product.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <ProductDetailsDialog product={product} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="text-muted-foreground text-center text-sm">
            إجمالي المنتجات: {data.totalElements}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsPage;
