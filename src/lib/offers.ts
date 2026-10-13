import { promises as fs } from "fs";
import path from "path";
import { cacheLife } from "next/cache";
import type { Offer, OfferSide } from "./types";

const OFFERS_DIR = path.join(process.cwd(), "content/offers");

function isOffer(value: unknown): value is Offer {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<Offer>;
  return (
    typeof v.slug === "string" &&
    (v.status === "published" || v.status === "draft") &&
    (v.side === "buy" || v.side === "sell") &&
    typeof v.title === "object"
  );
}

export async function getAllOffers(): Promise<Offer[]> {
  "use cache";
  cacheLife("hours");

  try {
    const files = await fs.readdir(OFFERS_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    const offers = await Promise.all(
      jsonFiles.map(async (file) => {
        const raw = await fs.readFile(path.join(OFFERS_DIR, file), "utf8");
        const parsed: unknown = JSON.parse(raw);
        if (!isOffer(parsed)) {
          throw new Error(`Invalid offer file: ${file}`);
        }
        return parsed;
      }),
    );
    return offers
      .filter((o) => o.status === "published")
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export function filterOffersBySide(
  offers: Offer[],
  side?: OfferSide | "all",
): Offer[] {
  if (!side || side === "all") return offers;
  return offers.filter((o) => o.side === side);
}
