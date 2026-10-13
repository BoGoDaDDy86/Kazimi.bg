import { getTranslations } from "next-intl/server";

export async function ListingsEmpty() {
  const t = await getTranslations("Listings");
  return (
    <div className="border border-dashed border-border bg-white/50 px-6 py-16 text-center">
      <h2 className="font-display text-2xl tracking-tight">{t("emptyTitle")}</h2>
      <p className="mt-2 text-muted-foreground">{t("emptyText")}</p>
    </div>
  );
}
