"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SIZES_UNITS } from "@/constants/sizes_units";
import { AddProductSchema } from "@/lib/zod";
import { Size } from "@/types/size";
import { Plus, Trash2 } from "lucide-react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";

interface ProductVariantsProps {
  control: Control<AddProductSchema>;
  sizes?: Size[];
}

function ProductVariants({ control, sizes }: ProductVariantsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const addVariant = () => {
    append({
      isAvailable: true,
      price: 0,
      size: undefined,
      unit: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">أحجام المنتج</h3>
        <Button type="button" onClick={addVariant} size="sm" variant="outline">
          <Plus className="ml-2 h-4 w-4" />
          إضافة حجم
        </Button>
      </div>

      {fields.length === 0 && (
        <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
          لا توجد أحجام. انقر على {"إضافة حجم"} لإضافة حجم جديد.
        </div>
      )}

      {fields.map((field, index) => (
        <ProductVariantItem
          key={field.id}
          index={index}
          control={control}
          sizes={sizes}
          onRemove={() => remove(index)}
        />
      ))}
    </div>
  );
}
interface ProductVariantItemProps {
  index: number;
  control: Control<AddProductSchema>;
  sizes?: Size[];
  onRemove: () => void;
}
function ProductVariantItem({ index, control, sizes, onRemove }: ProductVariantItemProps) {
  const form = useFormContext<AddProductSchema>();
  const isSelectedSize = form.watch(`variants.${index}.sizeId`);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">الحجم {index + 1}</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="text-destructive h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Size Selection */}
        <FormField
          control={control}
          name={`variants.${index}.sizeId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>اختر من القائمة</FormLabel>
              <FormControl>
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value) => {
                    field.onChange(value);
                    const selectedSize = sizes?.find((s) => s.id.toString() === value);
                    if (selectedSize) {
                      form.setValue(`variants.${index}.size`, null);
                      form.setValue(`variants.${index}.unit`, null);
                    }
                  }}
                >
                  <SelectTrigger dir="rtl" className="w-full">
                    <SelectValue placeholder="حجم مخصص" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {sizes?.map((size) => (
                      <SelectItem key={size.id} value={size.id.toString()}>
                        {size.size} {size.unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name={`variants.${index}.size`}
            disabled={!!isSelectedSize}
            render={({ field }) => (
              <FormItem>
                <FormLabel>الحجم</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="الحجم"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value ? Number(e.target.value) : undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`variants.${index}.unit`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوحدة</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger dir="rtl" className="w-full" disabled={!!isSelectedSize}>
                      <SelectValue placeholder="اختر وحدة" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      {Object.values(SIZES_UNITS).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name={`variants.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>السعر</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`variants.${index}.isAvailable`}
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <FormLabel className="m-0">متوفر</FormLabel>
              <FormControl>
                <Switch
                  className="flex-row-reverse"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default ProductVariants;
