"use client";
import { useCategories } from "@/hooks/use-categories";
import { useOffers } from "@/hooks/use-offers";
import { PublicCountry } from "@/types/country";
import { Globe, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SelectCountry from "../country/SelectCountry";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Logo from "./Logo";

function MenuComponent({
  countries,
  selecedCountryCode,
}: {
  countries: PublicCountry[];
  selecedCountryCode?: string;
}) {
  const { data: categories, isFetching } = useCategories();
  const { data: offers } = useOffers();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" dir="ltr">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b p-6 text-right">
          <SheetTitle className="text-right">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex h-[calc(100vh-15rem)] flex-col gap-6 px-6">
          <div className="flex flex-col gap-4">
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-muted-foreground pt-4 text-xs font-bold tracking-widest uppercase">
                الأقسام
              </h3>
              <div className="flex flex-col gap-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="offers">
                    <AccordionTrigger>العروض</AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-1 mr-2 flex flex-col gap-2 border-r pr-4">
                        {offers?.map((offer) => (
                          <Link
                            key={offer.id}
                            href={`/products?offer=${offer.id}`}
                            onClick={() => setOpen(false)}
                            className="hover:text-primary py-1 text-base transition-colors"
                          >
                            {offer.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {categories?.map((category) => {
                    const hasSubcategories = category.children && category.children.length > 0;

                    if (hasSubcategories) {
                      return (
                        <AccordionItem key={category.id} value={category.id.toString()}>
                          <AccordionTrigger>{category.name}</AccordionTrigger>
                          <AccordionContent>
                            <div className="mt-1 mr-2 flex flex-col gap-2 border-r pr-4">
                              {category.children.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/products?category=${sub.id}`}
                                  onClick={() => setOpen(false)}
                                  className="hover:text-primary py-1 text-base transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }

                    return (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        onClick={() => setOpen(false)}
                        className="hover:text-primary flex items-center py-2 text-lg font-medium transition-colors"
                      >
                        {category.name}
                      </Link>
                    );
                  })}
                </Accordion>
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
            <div className="max-w-35 flex-1">
              <SelectCountry countries={countries} selectedCountryCode={selecedCountryCode} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MenuComponent;
