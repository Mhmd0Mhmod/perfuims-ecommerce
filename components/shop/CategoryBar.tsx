import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

function CategoryBar() {
  return (
    <div className="bg-muted/30 w-full border-t">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-none border-0 bg-transparent p-0 py-3">
            <TabsTrigger value="all" asChild>
              <Link href="/shop">الكل</Link>
            </TabsTrigger>
            <TabsTrigger value="men" asChild>
              <Link href="/category/men">عطور رجالية</Link>
            </TabsTrigger>
            <TabsTrigger value="women" asChild>
              <Link href="/category/women">عطور نسائية</Link>
            </TabsTrigger>
            <TabsTrigger value="unisex" asChild>
              <Link href="/category/unisex">عطور للجنسين</Link>
            </TabsTrigger>
            <TabsTrigger value="luxury" asChild>
              <Link href="/category/luxury">عطور فاخرة</Link>
            </TabsTrigger>
            <TabsTrigger value="oriental" asChild>
              <Link href="/category/oriental">عطور شرقية</Link>
            </TabsTrigger>
            <TabsTrigger value="fresh" asChild>
              <Link href="/category/fresh">عطور منعشة</Link>
            </TabsTrigger>
            <TabsTrigger value="deals" asChild className="text-primary">
              <Link href="/deals">العروض الخاصة ✨</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

export default CategoryBar;
