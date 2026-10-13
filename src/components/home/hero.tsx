"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
      <Image
        src="/listings/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(242,99,56,0.28),transparent_55%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-semibold tracking-[0.12em] uppercase sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {t("brand")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 text-sm font-medium tracking-[0.4em] text-brand uppercase sm:text-base"
        >
          {t("tagline")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-balance font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-4xl"
        >
          {t("headline")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-xl text-pretty text-base text-white/75 sm:text-lg"
        >
          {t("subhead")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="/apartments"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-brand text-brand-foreground hover:bg-brand/90",
            )}
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/offers"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-white/35 bg-transparent text-white hover:bg-white/10",
            )}
          >
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
