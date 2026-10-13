"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { KazimiLogo } from "@/components/brand/kazimi-logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/apartments" as const, key: "apartments" as const },
  { href: "/offers" as const, key: "offers" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/contact" as const, key: "contact" as const },
];

type SiteHeaderProps = {
  transparent?: boolean;
};

export function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-40",
        transparent ? "text-white" : "text-foreground",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="relative z-10">
          <KazimiLogo tone={transparent ? "light" : "dark"} showTagline={false} />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-opacity hover:opacity-70",
                transparent ? "text-white/90" : "text-foreground/80",
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher tone={transparent ? "light" : "dark"} />
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              "bg-brand text-brand-foreground hover:bg-brand/90",
            )}
          >
            {t("cta")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher tone={transparent ? "light" : "dark"} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(transparent && "text-white hover:bg-white/10")}
                  aria-label="Menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-mist">
              <SheetHeader>
                <SheetTitle>
                  <KazimiLogo showTagline={false} />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4 px-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl tracking-tight"
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "mt-4 bg-brand text-brand-foreground",
                  )}
                >
                  {t("cta")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
