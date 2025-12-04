import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
function ActiveBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge variant={isActive ? "default" : "secondary"} className="gap-1">
      {isActive ? (
        <>
          <CheckCircle2 className="h-3 w-3" />
          نشط
        </>
      ) : (
        <>
          <XCircle className="h-3 w-3" />
          غير نشط
        </>
      )}
    </Badge>
  );
}
export default ActiveBadge;
