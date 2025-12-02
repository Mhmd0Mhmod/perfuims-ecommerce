import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  className?: string;
}

function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={className}>
      <div className="relative w-full">
        <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
        <Input type="search" placeholder="ابحث عن العطور..." className="bg-muted/50 w-full pr-10" />
      </div>
    </div>
  );
}

export default SearchBar;
