"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { KazimiLogo } from "@/components/brand/kazimi-logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SocialLinksClient } from "@/components/layout/social-links-client";
import { buttonVariants } from "@/components/ui/button";
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
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const node = detailsRef.current;
    if (!node) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") node.open = false;
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-40",
        transparent ? "text-white" : "text-foreground",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="relative z-10 inline-flex min-h-11 items-center">
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

        <div className="hidden items-center gap-2 md:flex">
          <SocialLinksClient tone={transparent ? "light" : "dark"} />
          <LocaleSwitcher tone={transparent ? "light" : "dark"} />
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-brand text-brand-foreground hover:bg-brand/90",
            )}
          >
            {t("cta")}
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LocaleSwitcher tone={transparent ? "light" : "dark"} />
          <details ref={detailsRef} className="group relative">
            <summary
              aria-label="Menu"
              className={cn(
                "relative z-[70] flex size-11 list-none items-center justify-center rounded-lg transition-colors marker:content-none [&::-webkit-details-marker]:hidden",
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Menu className="size-5 group-open:hidden" aria-hidden />
              <X className="hidden size-5 group-open:block" aria-hidden />
            </summary>
            <div
              className="fixed inset-0 z-[60] bg-ink/40"
              aria-hidden
            />
            <div
              id="mobile-nav-sheet"
              className="fixed inset-y-0 right-0 z-[65] flex w-[min(100%,20rem)] flex-col bg-mist text-foreground shadow-lg"
            >
              <div className="flex items-center justify-between gap-3 p-4">
                <KazimiLogo showTagline={false} />
                <button
                  type="button"
                  aria-label="Close"
                  onClick={closeMenu}
                  className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-muted"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <nav className="mt-4 flex flex-col gap-2 px-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="inline-flex min-h-12 items-center font-display text-2xl tracking-tight"
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-4 bg-brand text-brand-foreground",
                  )}
                >
                  {t("cta")}
                </Link>
                <SocialLinksClient className="mt-6" />
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
