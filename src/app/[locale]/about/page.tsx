import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { AGENTS } from "@/lib/types";
import { tLocal } from "@/lib/listings";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const appLocale = (await getLocale()) as AppLocale;

  return (
    <main>
      <div className="relative pb-20 pt-28">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="font-display text-xs tracking-[0.3em] text-brand uppercase">
            Kazimi
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-pretty">{t("lead")}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
            {t("truth")}
          </p>
          <p className="mt-8 font-display text-2xl tracking-tight text-brand">
            {t("closing")}
          </p>

          <div className="mt-16 grid gap-10 sm:grid-cols-2">
            {(["iva", "mina"] as const).map((id) => {
              const agent = AGENTS[id];
              return (
                <div key={id} className="border-t border-border pt-6">
                  <h2 className="font-display text-2xl tracking-tight">
                    {tLocal(agent.name, appLocale)}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {id === "iva" ? t("ivaRole") : t("minaRole")}
                  </p>
                  <a
                    href={`tel:${agent.phone.replace(/\s/g, "")}`}
                    className="mt-4 block text-sm hover:text-brand"
                  >
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="mt-1 block text-sm hover:text-brand"
                  >
                    {agent.email}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
