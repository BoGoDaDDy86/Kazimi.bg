import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  formatPrice,
  getAllListings,
  getListingBySlug,
  tLocal,
} from "@/lib/listings";
import { AGENTS } from "@/lib/types";
import { cn } from "@/lib/utils";

export const instant = false;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const listings = await getAllListings();
  return routing.locales.flatMap((locale) =>
    listings.map((listing) => ({ locale, slug: listing.slug })),
  );
}

export default async function ListingDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const appLocale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Listings");

  let listing;
  try {
    listing = await getListingBySlug(slug);
  } catch {
    listing = null;
  }
  if (!listing) {
    notFound();
  }

  const agent = AGENTS[listing.agent];
  const price = formatPrice(
    listing.price,
    listing.currency,
    appLocale,
    listing.type === "rent",
  );
  const image = listing.images[0] ?? "/listings/hero.jpg";

  return (
    <main>
      <div className="relative pb-16 pt-28">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/apartments"
            data-back-link
            className="inline-flex min-h-11 items-center py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t("back")}
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                <Image
                  src={image}
                  alt={tLocal(listing.title, appLocale)}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="mt-8">
                <Badge className="rounded-sm bg-ink text-white hover:bg-ink">
                  {listing.type === "sale" ? t("sale") : t("rent")}
                </Badge>
                <h1 className="mt-4 font-display text-3xl tracking-tight text-balance md:text-4xl">
                  {tLocal(listing.title, appLocale)}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {tLocal(listing.neighborhood, appLocale)},{" "}
                  {tLocal(listing.city, appLocale)}
                </p>
                <p className="mt-6 text-lg leading-relaxed text-pretty">
                  {tLocal(listing.description, appLocale)}
                </p>
                <h2 className="mt-10 font-display text-xl tracking-tight">
                  {t("features")}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {listing.features[appLocale].map((feature) => (
                    <li
                      key={feature}
                      className="border border-border bg-white/70 px-3 py-1.5 text-sm"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="h-fit border border-border bg-white/70 p-6 lg:sticky lg:top-28">
              <p className="font-display text-3xl text-brand">
                {price ?? t("priceOnRequest")}
                {price && listing.type === "rent" ? (
                  <span className="text-base text-muted-foreground">
                    {" "}
                    {t("perMonth")}
                  </span>
                ) : null}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("rooms", { count: listing.rooms })} ·{" "}
                {t("area", { value: listing.area })}
                {listing.floor != null
                  ? ` · ${t("floor", { value: listing.floor })}`
                  : ""}
              </p>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">{t("contactAgent")}</p>
                <p className="mt-1 font-display text-xl">
                  {tLocal(agent.name, appLocale)}
                </p>
                <a
                  href={`tel:${agent.phone.replace(/\s/g, "")}`}
                  className="mt-3 inline-flex min-h-11 items-center text-sm hover:text-brand"
                >
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90",
                  )}
                >
                  {agent.email}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
