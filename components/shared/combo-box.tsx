import { createContext, useContext, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
const comboBoxContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});
function ComboBox({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <comboBoxContext.Provider value={{ open, setOpen }}>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </comboBoxContext.Provider>
  );
}
function useComboBoxContext() {
  return useContext(comboBoxContext);
}
function ComboBoxTrigger({ children }: { children: React.ReactNode }) {
  return <PopoverTrigger asChild>{children}</PopoverTrigger>;
}
function ComboBoxContent({ children }: { children: React.ReactNode }) {
  return (
    <PopoverContent className="w-full p-0">
      <Command>{children}</Command>
    </PopoverContent>
  );
}
function ComboBoxInput({ placeholder }: { placeholder: string }) {
  return <CommandInput placeholder={placeholder} />;
}
function ComboBoxList({
  emptyState,
  children,
}: {
  emptyState: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <CommandList>
      <CommandEmpty>{emptyState}</CommandEmpty>
      <CommandGroup>{children}</CommandGroup>
    </CommandList>
  );
}
function ComboBoxItem({
  value,
  onSelect,
  children,
}: {
  value: string;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  const { setOpen } = useComboBoxContext();
  function onSelectItem() {
    onSelect();
    setOpen(false);
  }
  return (
    <CommandItem key={value} value={value} onSelect={onSelectItem}>
      {children}
    </CommandItem>
  );
}

ComboBox.Trigger = ComboBoxTrigger;
ComboBox.Content = ComboBoxContent;
ComboBox.Input = ComboBoxInput;
ComboBox.List = ComboBoxList;
ComboBox.Item = ComboBoxItem;

export default ComboBox;
