import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function NotFound() {
  const t = await getTranslations("Listings");

  return (
    <main>
      <div className="relative flex min-h-[70vh] flex-col pb-16 pt-28">
        <SiteHeader />
        <div className="mx-auto flex max-w-6xl flex-1 flex-col items-start justify-center px-4 sm:px-6">
          <h1 className="font-display text-4xl tracking-tight">{t("notFound")}</h1>
          <Link
            href="/apartments"
            className={cn(buttonVariants(), "mt-6 bg-brand text-brand-foreground")}
          >
            {t("back")}
          </Link>
        </div>
      </div>
    </main>
  );
}
