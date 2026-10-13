import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { SocialLinks } from "@/components/layout/social-links";
import { AGENTS } from "@/lib/types";
import { tLocal } from "@/lib/listings";

export const instant = false;

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
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="font-display text-xs tracking-[0.3em] text-brand uppercase">
            Kazimi
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl tracking-tight md:text-5xl">
            {t("title")}
          </h1>

          <figure className="mt-10 overflow-hidden bg-muted">
            <div className="relative aspect-[6/5] w-full sm:aspect-[4/3]">
              <Image
                src="/about/iva-mina.jpg"
                alt={t("photoAlt")}
                fill
                priority
                className="object-cover object-[50%_28%]"
                sizes="(max-width: 1024px) 100vw, 64rem"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {t("photoCaption")}
            </figcaption>
          </figure>

          <div className="mt-10 max-w-3xl">
            <p className="text-lg leading-relaxed text-pretty">{t("lead")}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground text-pretty">
              {t("truth")}
            </p>
            <p className="mt-8 font-display text-2xl tracking-tight text-brand">
              {t("closing")}
            </p>
            <div className="mt-8">
              <p className="text-sm text-muted-foreground">{t("follow")}</p>
              <SocialLinks className="mt-2" />
            </div>
          </div>

          <div className="mt-16 grid max-w-3xl gap-10 sm:grid-cols-2">
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
                    className="mt-4 inline-flex min-h-11 items-center text-sm hover:text-brand"
                  >
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="inline-flex min-h-11 items-center text-sm hover:text-brand"
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
