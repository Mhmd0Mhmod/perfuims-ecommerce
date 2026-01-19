import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "../ui/separator";

async function Footer() {
  return (
    <footer className="bg-muted/30 mt-16 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="text-right">
            <div className="mb-4 flex flex-col items-start">
              <h2 className="text-primary text-2xl font-bold">عطور فاخرة</h2>
              <p className="text-muted-foreground text-sm">Luxury Perfumes</p>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              وجهتك المثالية لاكتشاف أجود أنواع العطور الفاخرة والمميزة من أرقى العلامات التجارية
              العالمية
            </p>

            {/* Social Media Links */}
            <div className="flex justify-start gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="bg-background hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="bg-background hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="bg-background hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="mb-4 text-lg font-bold">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link
                  href="/products?deal=true"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  العروض الخاصة
                </Link>
              </li>
              <li>
                <Link
                  href="/products?featured=true"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  المنتجات المميزة
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  سلة التسوق
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  حسابي
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-right">
            <h3 className="mb-4 text-lg font-bold">خدمة العملاء</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  من نحن
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  الشحن والتوصيل
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  سياسة الاسترجاع
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <h3 className="mb-4 text-lg font-bold">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-start justify-start gap-3">
                <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <div className="text-muted-foreground text-sm leading-relaxed">
                  المملكة العربية السعودية
                  <br />
                  الرياض، حي الملقا
                </div>
              </li>
              <li className="flex items-center justify-start gap-3">
                <Phone className="text-primary h-5 w-5 shrink-0" />
                <Link
                  href="tel:+966501234567"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  dir="ltr"
                >
                  +966 50 123 4567
                </Link>
              </li>
              <li className="flex items-center justify-start gap-3">
                <Mail className="text-primary h-5 w-5 shrink-0" />
                <Link
                  href="mailto:info@luxuryperfumes.sa"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  dir="ltr"
                >
                  info@luxuryperfumes.sa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-right">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} عطور فاخرة. جميع الحقوق محفوظة.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">طرق الدفع:</span>
            <div className="flex gap-2">
              <div className="bg-background rounded border px-2 py-1 text-xs font-semibold">
                Visa
              </div>
              <div className="bg-background rounded border px-2 py-1 text-xs font-semibold">
                Mastercard
              </div>
              <div className="bg-background rounded border px-2 py-1 text-xs font-semibold">
                mada
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
