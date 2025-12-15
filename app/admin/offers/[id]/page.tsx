import AddOfferForm from "@/components/admin/offers/AddOfferForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAdminOfferById } from "../helper";
import { getAdminProducts } from "@/app/admin/products/helper";
import { notFound } from "next/navigation";

interface EditOfferPageProps {
  params: Promise<{ id: string }>;
}

async function EditOfferPage({ params }: EditOfferPageProps) {
  const { id } = await params;

  let offer;
  try {
    offer = await getAdminOfferById(id);
  } catch {
    notFound();
  }

  const productsData = await getAdminProducts();
  const products = productsData.content;

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/offers">
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">تعديل العرض</h1>
          <p className="text-muted-foreground">تعديل بيانات العرض: {offer.title}</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>بيانات العرض</CardTitle>
          <CardDescription>قم بتعديل المعلومات المطلوبة لتحديث العرض</CardDescription>
        </CardHeader>
        <CardContent>
          <AddOfferForm offer={offer} products={products} />
        </CardContent>
      </Card>
    </div>
  );
}

export default EditOfferPage;
