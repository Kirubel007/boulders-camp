import type { MetadataRoute } from "next";

const base = "https://boulders-camp.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/experience`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
