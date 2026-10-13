import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { KazimiLogo } from "@/components/brand/kazimi-logo";
import { SocialLinks } from "@/components/layout/social-links";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-border/70 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/">
            <KazimiLogo tone="brand" />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/65">{t("tagline")}</p>
          <SocialLinks tone="brand" className="mt-5" />
        </div>
        <p className="text-sm text-white/45">{t("rights", { year: 2026 })}</p>
      </div>
    </footer>
  );
}
