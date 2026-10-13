import { promises as fs } from "fs";
import path from "path";
import { cacheLife } from "next/cache";
import type { AppLocale } from "@/i18n/routing";
import type { Listing, ListingType, LocalizedString } from "./types";

const LISTINGS_DIR = path.join(process.cwd(), "content/listings");

function isListing(value: unknown): value is Listing {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<Listing>;
  return (
    typeof v.slug === "string" &&
    (v.status === "published" || v.status === "draft") &&
    (v.type === "sale" || v.type === "rent") &&
    typeof v.title === "object"
  );
}

export async function getAllListings(): Promise<Listing[]> {
  "use cache";
  cacheLife("hours");

  try {
    const files = await fs.readdir(LISTINGS_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    const listings = await Promise.all(
      jsonFiles.map(async (file) => {
        const raw = await fs.readFile(path.join(LISTINGS_DIR, file), "utf8");
        const parsed: unknown = JSON.parse(raw);
        if (!isListing(parsed)) {
          throw new Error(`Invalid listing file: ${file}`);
        }
        return parsed;
      }),
    );
    return listings
      .filter((l) => l.status === "published")
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const listings = await getAllListings();
  return listings.find((l) => l.slug === slug) ?? null;
}

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  const listings = await getAllListings();
  const featured = listings.filter((l) => l.featured);
  return (featured.length ? featured : listings).slice(0, limit);
}

export function filterListingsByType(
  listings: Listing[],
  type?: ListingType | "all",
): Listing[] {
  if (!type || type === "all") return listings;
  return listings.filter((l) => l.type === type);
}

export function tLocal(
  value: LocalizedString,
  locale: AppLocale,
): string {
  return value[locale] ?? value.bg ?? value.en ?? "";
}

export function formatPrice(
  price: number | null,
  currency: Listing["currency"],
  locale: AppLocale,
  perMonth = false,
): string | null {
  if (price == null) return null;
  const formatted = new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
  return perMonth ? `${formatted}` : formatted;
}
