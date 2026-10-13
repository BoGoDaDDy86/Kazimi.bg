import { getTranslations } from "next-intl/server";
import { FacebookIcon, InstagramIcon } from "@/components/brand/social-icons";
import { SOCIAL_LINKS } from "@/lib/socials";
import { cn } from "@/lib/utils";

const icons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} as const;

type SocialLinksProps = {
  className?: string;
  tone?: "light" | "dark" | "brand";
  size?: "sm" | "md";
};

export async function SocialLinks({
  className,
  tone = "dark",
  size = "md",
}: SocialLinksProps) {
  const t = await getTranslations("Social");
  const dim = size === "sm" ? "size-10" : "size-11";
  const icon = size === "sm" ? "size-4" : "size-5";

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
              "inline-flex items-center justify-center rounded-lg transition-colors",
              dim,
              tone === "light" && "text-white/85 hover:bg-white/10 hover:text-white",
              tone === "dark" && "text-foreground/80 hover:bg-muted hover:text-foreground",
              tone === "brand" && "text-white/80 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className={icon} />
          </a>
        );
      })}
    </nav>
  );
}
