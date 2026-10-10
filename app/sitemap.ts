import type { MetadataRoute } from "next";

const siteUrl = "https://kenoratech.com";

const pages: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/process", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/book-consultation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/copyright-notice", changeFrequency: "yearly", priority: 0.2 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority
  }));
}