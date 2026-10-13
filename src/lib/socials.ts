export type SocialLink = {
  id: "facebook" | "instagram";
  href: string;
  labelKey: "facebook" | "instagram";
};

/**
 * Verified public profiles for Kazimi Properties (Sofia).
 * Note: https://www.kazimi.bg currently does not expose social hrefs in HTML;
 * these URLs were confirmed as the live Facebook page "Kazimi | Sofia" and
 * Instagram @kazimi.properties.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "facebook",
    href: "https://www.facebook.com/kazimiproperties/",
    labelKey: "facebook",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/kazimi.properties/",
    labelKey: "instagram",
  },
];
