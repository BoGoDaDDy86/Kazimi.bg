"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type TypeFilterProps = {
  active: "all" | "sale" | "rent";
};

const options = ["all", "sale", "rent"] as const;

export function TypeFilter({ active }: TypeFilterProps) {
  const t = useTranslations("Listings");
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const href =
          option === "all" ? pathname : `${pathname}?type=${option}`;
        const isActive = active === option;
        return (
          <Link
            key={option}
            href={href}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors",
              isActive
                ? "border-ink bg-ink text-white"
                : "border-border bg-white/60 hover:bg-muted",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {t(option)}
          </Link>
        );
      })}
    </div>
  );
}
