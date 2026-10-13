import { cn } from "@/lib/utils";

type KazimiLogoProps = {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
  tone?: "light" | "dark" | "brand";
};

export function KazimiLogo({
  className,
  markClassName,
  showTagline = true,
  tone = "dark",
}: KazimiLogoProps) {
  const color =
    tone === "light"
      ? "text-white"
      : tone === "brand"
        ? "text-brand"
        : "text-ink";

  return (
    <span className={cn("inline-flex flex-col items-start leading-none", color, className)}>
      <span className="inline-flex items-center gap-2">
        <svg
          viewBox="0 0 64 64"
          className={cn("size-7 shrink-0", markClassName)}
          fill="none"
          aria-hidden
        >
          <path
            d="M12 28 L32 10 L52 28 V54 H12 Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
          <rect x="36" y="40" width="3" height="14" fill="currentColor" />
        </svg>
        <span className="font-display text-[1.35rem] font-semibold tracking-[0.18em] uppercase">
          Kazimi
        </span>
      </span>
      {showTagline ? (
        <span className="mt-1 pl-9 text-[0.65rem] font-medium tracking-[0.35em] uppercase opacity-80">
          properties
        </span>
      ) : null}
    </span>
  );
}
