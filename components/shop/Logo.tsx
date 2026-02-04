import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-80"
      aria-label="Go to homepage"
    >
      <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
        <Image 
          src="/assets/logo.png" 
          alt="Company Logo" 
          width={56}
          height={56}
          priority 
          className="h-full w-full object-contain" 
        />
      </div>
      <div className="flex flex-col">
        <span className="text-primary text-base leading-tight font-bold sm:text-lg">
          مؤسسه الطاحون
        </span>
        <span className="text-muted-foreground text-xs font-medium sm:text-sm">مسك للعطور</span>
      </div>
    </Link>
  );
}

export default Logo;
