import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { AGENTS } from "@/lib/types";
import { tLocal } from "@/lib/listings";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const appLocale = (await getLocale()) as AppLocale;

  return (
    <main>
      <div className="relative pb-20 pt-28">
        <SiteHeader />
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("lead")}</p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {(["iva", "mina"] as const).map((id) => {
              const agent = AGENTS[id];
              return (
                <div
                  key={id}
                  className="border border-border bg-white/70 p-8"
                >
                  <h2 className="font-display text-2xl tracking-tight">
                    {tLocal(agent.name, appLocale)}
                  </h2>
                  <dl className="mt-6 space-y-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground">{t("phone")}</dt>
                      <dd className="mt-1">
                        <a
                          className="text-lg hover:text-brand"
                          href={`tel:${agent.phone.replace(/\s/g, "")}`}
                        >
                          {agent.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{t("email")}</dt>
                      <dd className="mt-1">
                        <a className="hover:text-brand" href={`mailto:${agent.email}`}>
                          {agent.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
