import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { formatPrice, tLocal } from "@/lib/listings";
import type { Listing } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ListingCardProps = {
  listing: Listing;
};

export async function ListingCard({ listing }: ListingCardProps) {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Listings");
  const price = formatPrice(
    listing.price,
    listing.currency,
    locale,
    listing.type === "rent",
  );
  const image = listing.images[0] ?? "/listings/hero.jpg";

  return (
    <article className="group relative overflow-hidden border-b border-border/80 pb-8 pt-2">
      <Link href={`/apartments/${listing.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={image}
            alt={tLocal(listing.title, locale)}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="rounded-sm bg-ink text-white hover:bg-ink"
          >
            {listing.type === "sale" ? t("sale") : t("rent")}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {tLocal(listing.neighborhood, locale)}, {tLocal(listing.city, locale)}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl tracking-tight text-balance">
          {tLocal(listing.title, locale)}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          {tLocal(listing.summary, locale)}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-lg text-brand">
              {price ?? t("priceOnRequest")}
              {price && listing.type === "rent" ? (
                <span className="text-sm text-muted-foreground">
                  {" "}
                  {t("perMonth")}
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("rooms", { count: listing.rooms })} · {t("area", { value: listing.area })}
              {listing.floor != null ? ` · ${t("floor", { value: listing.floor })}` : ""}
            </p>
          </div>
          <span
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "pointer-events-none",
            )}
          >
            {t("details")}
          </span>
        </div>
      </Link>
    </article>
  );
}
