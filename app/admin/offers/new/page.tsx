import AddOfferForm from "@/components/admin/offers/AddOfferForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function NewOfferPage() {
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
                    <h1 className="text-3xl font-bold tracking-tight">إضافة عرض جديد</h1>
                    <p className="text-muted-foreground">أدخل بيانات العرض الجديد</p>
                </div>
            </div>

            {/* Form Card */}
            <Card>
                <CardHeader>
                    <CardTitle>بيانات العرض</CardTitle>
                    <CardDescription>
                        أدخل جميع المعلومات المطلوبة لإنشاء عرض جديد
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AddOfferForm />
                </CardContent>
            </Card>
        </div>
    );
}

export default NewOfferPage;