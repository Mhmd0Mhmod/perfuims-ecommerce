"use client";
import { Search, XCircle } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

function SearchInput({ placeholder }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      q: searchParams.get("q") || "",
    },
  });
  const onSumit = (data: { q: string }) => {
    const query = new URLSearchParams(searchParams.toString());
    console.log(data);

    if (data.q) {
      query.set("q", data.q);
    } else {
      query.delete("q");
    }
    router.push(`${pathName}?${query.toString()}`);
  };
  const onReset = () => {
    form.reset();
    const query = new URLSearchParams(searchParams.toString());
    query.delete("q");
    router.push(`${pathName}?${query.toString()}`);
  };
  return (
    <div className="flex w-fit items-center gap-2">
      <form onSubmit={form.handleSubmit(onSumit)}>
        <div className="relative w-full md:w-80">
          <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder={placeholder || "ابحث عن منتج..."}
            className="pr-10"
            {...form.register("q")}
          />
        </div>
      </form>
      <Button variant="outline" size="icon" onClick={onReset}>
        <XCircle className="text-muted-foreground h-4 w-4" />
      </Button>
    </div>
  );
}
export default SearchInput;
