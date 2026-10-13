"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const items = [
  { title: "saleTitle", text: "saleText" },
  { title: "rentTitle", text: "rentText" },
  { title: "buyTitle", text: "buyText" },
] as const;

export function Services() {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          {t("servicesTitle")}
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{t("servicesLead")}</p>
      </motion.div>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-t border-ink/15 pt-6"
          >
            <p className="font-display text-xs tracking-[0.25em] text-brand uppercase">
              0{index + 1}
            </p>
            <h3 className="mt-3 font-display text-2xl tracking-tight">
              {t(item.title)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(item.text)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
