"use client";

import * as React from "react";
import { X, ChevronsUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "اختر عناصر...",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (value: string) => {
    onChange(selected.filter((s) => s !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-fit w-full justify-between text-right",
            !selected.length && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <div className="flex flex-1 flex-wrap items-center gap-1">
            {selected.length > 0 ? (
              <>
                {selected.slice(0, 2).map((value) => {
                  const option = options.find((opt) => opt.value === value);
                  return (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="mr-1 gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnselect(value);
                      }}
                    >
                      {option?.label}
                      <X className="hover:text-destructive h-3 w-3" />
                    </Badge>
                  );
                })}
                {selected.length > 2 && (
                  <Badge variant="secondary" className="mr-1">
                    +{selected.length - 2} أخرى
                  </Badge>
                )}
              </>
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-full p-0" align="center">
        <Command>
          <CommandInput placeholder="ابحث..." className="h-9" />
          <CommandEmpty>لا توجد نتائج</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer"
                  >
                    <Checkbox checked={isSelected} className="ml-2" />
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
