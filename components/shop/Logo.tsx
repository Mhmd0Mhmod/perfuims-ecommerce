import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex flex-col items-end">
        <h1 className="text-primary text-2xl font-bold">عطور فاخرة</h1>
        <p className="text-muted-foreground text-xs">Luxury Perfumes</p>
      </div>
    </Link>
  );
}

export default Logo;
