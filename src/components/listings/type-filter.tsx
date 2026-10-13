"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type TypeFilterProps = {
  active: "all" | "sale" | "rent";
};

const options = ["all", "sale", "rent"] as const;

export function TypeFilter({ active }: TypeFilterProps) {
  const t = useTranslations("Listings");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => {
            const query = option === "all" ? "" : `?type=${option}`;
            router.push(`${pathname}${query}`);
          }}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === option
              ? "border-ink bg-ink text-white"
              : "border-border bg-white/60 hover:bg-muted",
          )}
        >
          {t(option)}
        </button>
      ))}
    </div>
  );
}
