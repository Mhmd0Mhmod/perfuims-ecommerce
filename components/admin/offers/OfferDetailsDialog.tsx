import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { DiscountType, Offer } from "@/types/offer";
import { Calendar, Clock, Percent, Tag } from "lucide-react";

interface OfferDetailsDialogProps {
    offer: Offer;
}

export default function OfferDetailsDialog({ offer }: OfferDetailsDialogProps) {
    const getDiscountDisplay = () => {
        if (offer.discountType === DiscountType.PERCENTAGE) {
            return `${offer.discountValue}%`;
        }
        return `${offer.discountValue} ر.س`;
    };

    const isExpired = new Date(offer.endDate) < new Date();
    const isUpcoming = new Date(offer.startDate) > new Date();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Badge variant={offer.isActive ? "default" : "secondary"}>
                    {offer.isActive ? "نشط" : "غير نشط"}
                </Badge>
                {isExpired && <Badge variant="destructive">منتهي</Badge>}
                {isUpcoming && <Badge variant="outline">قادم</Badge>}
            </div>

            <Separator />

            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <Tag className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                        <p className="text-sm font-medium">عنوان العرض</p>
                        <p className="text-muted-foreground text-sm">{offer.title}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Percent className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                        <p className="text-sm font-medium">قيمة الخصم</p>
                        <p className="text-muted-foreground text-sm">
                            {getDiscountDisplay()}
                            <span className="mr-2 text-xs">
                                ({offer.discountType === DiscountType.PERCENTAGE ? "نسبة مئوية" : "مبلغ ثابت"})
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                        <p className="text-sm font-medium">فترة العرض</p>
                        <p className="text-muted-foreground text-sm">
                            من {formatDate(offer.startDate)} إلى {formatDate(offer.endDate)}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Clock className="text-muted-foreground mt-0.5 h-5 w-5" />
                    <div>
                        <p className="text-sm font-medium">تاريخ الإنشاء</p>
                        <p className="text-muted-foreground text-sm">{formatDate(offer.createdAt)}</p>
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <p className="mb-2 text-sm font-medium">الوصف</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{offer.description}</p>
            </div>
        </div>
    );
}
