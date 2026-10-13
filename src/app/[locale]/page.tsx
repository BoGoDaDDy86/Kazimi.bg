import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { SiteHeader } from "@/components/layout/site-header";
import { ListingCard } from "@/components/listings/listing-card";
import { OfferCard } from "@/components/offers/offer-card";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedListings } from "@/lib/listings";
import { getAllOffers } from "@/lib/offers";
import type { Listing, Offer } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const appLocale = (await getLocale()) as AppLocale;

  let featured: Listing[] = [];
  let offers: Offer[] = [];
  try {
    featured = await getFeaturedListings(3);
    offers = (await getAllOffers()).slice(0, 2);
  } catch {
    featured = [];
    offers = [];
  }

  return (
    <main>
      <SiteHeader transparent />
      <Hero />
      <Services />

      <section className="border-y border-border/60 bg-white/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl tracking-tight md:text-4xl">
                {t("featuredTitle")}
              </h2>
              <p className="mt-2 text-muted-foreground">{t("featuredLead")}</p>
            </div>
            <Link
              href="/apartments"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t("viewAll")}
            </Link>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              {t("offersTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("offersLead")}</p>
          </div>
          <Link
            href="/offers"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t("viewOffers")}
          </Link>
        </div>
        <div className="mt-4">
          {offers.map((offer) => (
            <OfferCard key={offer.slug} offer={offer} />
          ))}
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <p className="font-display text-xs tracking-[0.3em] text-brand uppercase">
            Kazimi
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl tracking-tight md:text-5xl">
            {t("aboutTitle")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/70 text-pretty">
            {t("aboutLead")}
          </p>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 inline-flex bg-brand text-brand-foreground hover:bg-brand/90",
            )}
          >
            {t("aboutCta")}
          </Link>
          <span className="sr-only">{appLocale}</span>
        </div>
      </section>
    </main>
  );
}
