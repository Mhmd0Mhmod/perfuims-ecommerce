"use client";
import { Menu, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { NavLinks } from "./NavLinks";
import { useCategories } from "@/hooks/use-categories";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import Link from "next/link";
import SelectCountry from "../country/SelectCountry";
import Logo from "./Logo";
import { useState } from "react";

function MobileMenu({ countries, defaultCountry }: { countries: any[]; defaultCountry?: string }) {
  const { data: categories } = useCategories();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[300px] flex-col border-l-0 p-0 sm:w-[350px]">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b p-6 text-right">
          <SheetTitle className="text-right">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6" dir="rtl">
          <div className="flex flex-col gap-8 py-8">
            {/* Main Navigation */}
            <div className="space-y-4">
              <h3 className="text-muted-foreground mr-1 text-xs font-bold tracking-widest uppercase">
                القائمة الرئيسية
              </h3>
              <NavLinks
                className="flex-col items-start gap-4"
                itemClassName="text-lg py-1 w-full"
                onLinkClick={() => setOpen(false)}
              />
            </div>

            <Separator className="opacity-50" />

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-muted-foreground mr-1 text-xs font-bold tracking-widest uppercase">
                الأقسام
              </h3>
              <div className="flex flex-col gap-3">
                {categories?.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.id}`}
                    onClick={() => setOpen(false)}
                    className="hover:text-primary py-1 text-lg font-medium transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
                {!categories &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="bg-muted h-6 w-24 animate-pulse rounded" />
                  ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="bg-muted/30 mt-auto border-t p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
              <Globe className="h-4 w-4" />
              <span>الدولة</span>
            </div>
            <div className="max-w-[140px] flex-1">
              <SelectCountry countries={countries} defaultCountry={defaultCountry} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
