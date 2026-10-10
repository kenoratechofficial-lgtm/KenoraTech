export const trafficSources = ["Instagram", "Google", "WhatsApp", "Facebook", "LinkedIn", "YouTube", "Direct", "Other"] as const;
export type TrafficSource = typeof trafficSources[number];

// Browser-safe traffic attribution helper. It must not import Node.js or MongoDB modules.
export function classifySource(utmSource = "", referrer = ""): TrafficSource {
  const value = `${utmSource} ${referrer}`.toLowerCase();
  if (!value.trim()) return "Direct";
  if (value.includes("instagram") || value.includes("ig.")) return "Instagram";
  if (value.includes("whatsapp") || value.includes("wa.me")) return "WhatsApp";
  if (value.includes("google") || value.includes("bing") || value.includes("duckduckgo")) return "Google";
  if (value.includes("facebook") || value.includes("fb.")) return "Facebook";
  if (value.includes("linkedin")) return "LinkedIn";
  if (value.includes("youtube")) return "YouTube";
  return "Other";
}
