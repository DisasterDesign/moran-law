import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.moransudryhen.co.il";
  const locales = ["he", "en"];

  const routes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/labor-law-employees", priority: 0.9 },
    { path: "/labor-law-employers", priority: 0.9 },
    { path: "/torts", priority: 0.9 },
    { path: "/national-insurance", priority: 0.9 },
    { path: "/power-of-attorney", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
  ];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route.priority,
    }))
  );
}
