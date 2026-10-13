"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
  tone?: "light" | "dark";
};

export function LocaleSwitcher({ className, tone = "dark" }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
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
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              active
                ? tone === "light"
                  ? "bg-brand text-brand-foreground"
                  : "bg-ink text-white"
                : tone === "light"
                  ? "hover:bg-white/15"
                  : "hover:bg-muted",
            )}
            aria-pressed={active}
          >
            {t(loc)}
          </button>
        );
      })}
    </div>
  );
}
