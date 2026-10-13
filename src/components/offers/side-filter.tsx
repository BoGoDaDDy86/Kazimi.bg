"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type SideFilterProps = {
  active: "all" | "buy" | "sell";
};

const options = ["all", "buy", "sell"] as const;

export function SideFilter({ active }: SideFilterProps) {
  const t = useTranslations("Offers");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => {
            const query = option === "all" ? "" : `?side=${option}`;
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
