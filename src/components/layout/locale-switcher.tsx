"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
  tone?: "light" | "dark";
};

export function LocaleSwitcher({ className, tone = "dark" }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("Locale");

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5 text-xs font-semibold tracking-wide",
        tone === "light"
          ? "border-white/25 bg-white/10 text-white"
          : "border-border bg-white/70 text-foreground",
        className,
      )}
      role="group"
      aria-label={t("switchTo")}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold tracking-wide transition-colors",
              active
                ? tone === "light"
                  ? "bg-brand text-brand-foreground"
                  : "bg-ink text-white"
                : tone === "light"
                  ? "hover:bg-white/15"
                  : "hover:bg-muted",
            )}
            aria-current={active ? "true" : undefined}
            aria-pressed={active}
          >
            {t(loc)}
          </Link>
        );
      })}
    </div>
  );
}
