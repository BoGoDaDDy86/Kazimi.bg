import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { formatPrice, tLocal } from "@/lib/listings";
import type { Offer } from "@/lib/types";
import { AGENTS } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

type OfferCardProps = {
  offer: Offer;
};

export async function OfferCard({ offer }: OfferCardProps) {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Offers");
  const agent = AGENTS[offer.agent];
  const min = formatPrice(offer.budgetMin, offer.currency, locale);
  const max = formatPrice(offer.budgetMax, offer.currency, locale);
  const upTo = locale === "bg" ? "до" : "up to";
  const from = locale === "bg" ? "от" : "from";
  const budget =
    min && max ? `${min} – ${max}` : max ? `${upTo} ${max}` : min ? `${from} ${min}` : "—";

  return (
    <article className="border-b border-border/80 py-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-sm bg-brand text-brand-foreground hover:bg-brand">
          {offer.side === "buy" ? t("buy") : t("sell")}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {tLocal(offer.neighborhood, locale)} · {tLocal(offer.city, locale)}
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl tracking-tight text-balance">
        {tLocal(offer.title, locale)}
      </h3>
      <p className="mt-2 max-w-2xl text-muted-foreground text-pretty">
        {tLocal(offer.summary, locale)}
      </p>
      <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        <div>
          <dt className="text-muted-foreground">{t("budget")}</dt>
          <dd className="font-medium">{budget}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("contact")}</dt>
          <dd className="font-medium">
            <a className="hover:text-brand" href={`mailto:${agent.email}`}>
              {tLocal(agent.name, locale)}
            </a>
          </dd>
        </div>
      </dl>
    </article>
  );
}
