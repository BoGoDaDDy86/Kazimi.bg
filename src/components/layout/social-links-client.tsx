"use client";

import { useTranslations } from "next-intl";
import { FacebookIcon, InstagramIcon } from "@/components/brand/social-icons";
import { SOCIAL_LINKS } from "@/lib/socials";
import { cn } from "@/lib/utils";

const icons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} as const;

type SocialLinksClientProps = {
  className?: string;
  tone?: "light" | "dark";
};

/** Client variant for use inside the mobile header menu. */
export function SocialLinksClient({
  className,
  tone = "dark",
}: SocialLinksClientProps) {
  const t = useTranslations("Social");

  return (
    <nav
      aria-label={t("label")}
      className={cn("flex items-center gap-1", className)}
    >
      {SOCIAL_LINKS.map((link) => {
        const Icon = icons[link.id];
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(link.labelKey)}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-lg transition-colors",
              tone === "light"
                ? "text-white/85 hover:bg-white/10 hover:text-white"
                : "text-foreground/80 hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-5" />
          </a>
        );
      })}
    </nav>
  );
}
