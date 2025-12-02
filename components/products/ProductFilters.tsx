import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, Search } from "lucide-react";

function ProductFilters() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold">التصفية</h3>
          <SlidersHorizontal className="text-muted-foreground h-5 w-5" />
        </div>

        <Separator className="mb-6" />

        {/* Search */}
        <div className="mb-6">
          <Label className="mb-2 block text-right">بحث</Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="ابحث عن منتج..." className="pr-10" dir="rtl" />
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">نطاق السعر</Label>
          <Slider defaultValue={[0, 1000]} max={2000} step={50} className="mb-4" />
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <span>2000 ريال</span>
            <span>0 ريال</span>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Categories */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">التصنيف</Label>
          <div className="space-y-3">
            {["عطور رجالية", "عطور نسائية", "عطور للجنسين", "عطور فاخرة", "عطور شرقية"].map(
              (category) => (
                <div key={category} className="flex items-center justify-end gap-2">
                  <Label htmlFor={category} className="cursor-pointer">
                    {category}
                  </Label>
                  <Checkbox id={category} />
                </div>
              ),
            )}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Brands */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">العلامة التجارية</Label>
          <div className="space-y-3">
            {["شانيل", "ديور", "غوتشي", "فيرساتشي", "توم فورد"].map((brand) => (
              <div key={brand} className="flex items-center justify-end gap-2">
                <Label htmlFor={brand} className="cursor-pointer">
                  {brand}
                </Label>
                <Checkbox id={brand} />
              </div>
            ))}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Rating */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">التقييم</Label>
          <div className="space-y-3">
            {["4 نجوم فأكثر", "3 نجوم فأكثر", "2 نجوم فأكثر"].map((rating) => (
              <div key={rating} className="flex items-center justify-end gap-2">
                <Label htmlFor={rating} className="cursor-pointer">
                  {rating}
                </Label>
                <Checkbox id={rating} />
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full">
          إعادة تعيين الفلاتر
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductFilters;
