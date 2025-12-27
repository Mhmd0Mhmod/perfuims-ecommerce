import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import AddCountryForm from "./AddCountryForm";
import { Country } from "@/types/country";

function EditCountryButton({ country }: { country: Country }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2" variant={"outline"} size={"sm"}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            تعديل معلومات الدولة #{country.id} - {country.name}
          </DialogTitle>
        </DialogHeader>
        <AddCountryForm country={country} />
      </DialogContent>
    </Dialog>
  );
}
export default EditCountryButton;
