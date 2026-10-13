import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Unbounded } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { routing } from "@/i18n/routing";

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: {
      default: t("title"),
      template: "%s · Kazimi",
    },
    description: t("description"),
    icons: {
      icon: "/favicon.png",
      apple: "/brand/kazimi-icon.png",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-full flex-1 flex-col">{children}</div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
