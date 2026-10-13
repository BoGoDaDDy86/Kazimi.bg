import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/site-header";
import { OfferCard } from "@/components/offers/offer-card";
import { SideFilter } from "@/components/offers/side-filter";
import { ListingsLoading } from "@/components/listings/listings-loading";
import { filterOffersBySide, getAllOffers } from "@/lib/offers";
import type { OfferSide } from "@/lib/types";

export const instant = false;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ side?: string }>;
};

async function OffersList({ side }: { side: "all" | OfferSide }) {
  try {
    const offers = filterOffersBySide(await getAllOffers(), side);
    if (offers.length === 0) {
      const t = await getTranslations("Offers");
      return (
        <div className="border border-dashed border-border bg-white/50 px-6 py-16 text-center">
          <h2 className="font-display text-2xl tracking-tight">{t("emptyTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("emptyText")}</p>
        </div>
      );
    }
    return (
      <div>
        {offers.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} />
        ))}
      </div>
    );
  } catch {
    const t = await getTranslations("Offers");
    return (
      <div className="border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
        <h2 className="font-display text-2xl tracking-tight text-destructive">
          {t("errorTitle")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("errorText")}</p>
      </div>
    );
  }
}

export default async function OffersPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Offers");
  const sp = await searchParams;
  const side =
    sp.side === "buy" || sp.side === "sell" ? sp.side : ("all" as const);

  return (
    <main>
      <div className="relative pb-16 pt-28">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("lead")}</p>
          <div className="mt-8">
            <SideFilter active={side} />
          </div>
          <div className="mt-6">
            <Suspense fallback={<ListingsLoading />}>
              <OffersList side={side} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
