import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/site-header";
import { ListingCard } from "@/components/listings/listing-card";
import { ListingsEmpty } from "@/components/listings/listings-empty";
import { ListingsError } from "@/components/listings/listings-error";
import { ListingsLoading } from "@/components/listings/listings-loading";
import { TypeFilter } from "@/components/listings/type-filter";
import {
  filterListingsByType,
  getAllListings,
} from "@/lib/listings";
import type { ListingType } from "@/lib/types";

// searchParams is request-time; allow blocking while filters stream
export const instant = false;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
};

async function ListingsGrid({ type }: { type: "all" | ListingType }) {
  try {
    const listings = filterListingsByType(await getAllListings(), type);
    if (listings.length === 0) {
      return <ListingsEmpty />;
    }
    return (
      <div className="grid gap-10 md:grid-cols-2">
        {listings.map((listing) => (
          <ListingCard key={listing.slug} listing={listing} />
        ))}
      </div>
    );
  } catch {
    return <ListingsError />;
  }
}

export default async function ApartmentsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Listings");
  const sp = await searchParams;
  const type =
    sp.type === "sale" || sp.type === "rent" ? sp.type : ("all" as const);

  return (
    <main>
      <div className="relative pb-8 pt-28">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("lead")}</p>
          <div className="mt-8">
            <TypeFilter active={type} />
          </div>
          <div className="mt-10">
            <Suspense fallback={<ListingsLoading />}>
              <ListingsGrid type={type} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
