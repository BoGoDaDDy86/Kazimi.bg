import { getTranslations } from "next-intl/server";

export async function ListingsError() {
  const t = await getTranslations("Listings");
  return (
    <div className="border border-destructive/30 bg-destructive/5 px-6 py-16 text-center">
      <h2 className="font-display text-2xl tracking-tight text-destructive">
        {t("errorTitle")}
      </h2>
      <p className="mt-2 text-muted-foreground">{t("errorText")}</p>
    </div>
  );
}
