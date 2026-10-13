import type { AppLocale } from "@/i18n/routing";

export type LocalizedString = Record<AppLocale, string>;
export type LocalizedStringList = Record<AppLocale, string[]>;

export type ListingType = "sale" | "rent";
export type OfferSide = "buy" | "sell";
export type ContentStatus = "published" | "draft";
export type AgentId = "iva" | "mina";

export type Listing = {
  slug: string;
  status: ContentStatus;
  type: ListingType;
  price: number | null;
  currency: "EUR" | "BGN";
  area: number;
  rooms: number;
  floor: number | null;
  city: LocalizedString;
  neighborhood: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  features: LocalizedStringList;
  images: string[];
  agent: AgentId;
  featured?: boolean;
  publishedAt: string;
};

export type Offer = {
  slug: string;
  status: ContentStatus;
  side: OfferSide;
  budgetMin: number | null;
  budgetMax: number | null;
  currency: "EUR" | "BGN";
  city: LocalizedString;
  neighborhood: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
  agent: AgentId;
  publishedAt: string;
};

export const AGENTS: Record<
  AgentId,
  { name: LocalizedString; phone: string; email: string }
> = {
  iva: {
    name: { bg: "Ива Иванова", en: "Iva Ivanova" },
    phone: "+359 879 364 957",
    email: "iva@kazimi.bg",
  },
  mina: {
    name: { bg: "Мина Чилова", en: "Mina Chilova" },
    phone: "+359 879 179 303",
    email: "mina@kazimi.bg",
  },
};
