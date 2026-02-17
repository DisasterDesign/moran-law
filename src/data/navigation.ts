export const navRoutes = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "laborEmployees", href: "/labor-law-employees" },
  { key: "laborEmployers", href: "/labor-law-employers" },
  { key: "torts", href: "/torts" },
  { key: "nationalInsurance", href: "/national-insurance" },
  { key: "powerOfAttorney", href: "/power-of-attorney" },
  { key: "contact", href: "/contact" },
] as const;

export const practiceAreaRoutes = [
  { key: "laborEmployees", href: "/labor-law-employees" },
  { key: "laborEmployers", href: "/labor-law-employers" },
  { key: "torts", href: "/torts" },
  { key: "nationalInsurance", href: "/national-insurance" },
  { key: "powerOfAttorney", href: "/power-of-attorney" },
] as const;

export type MenuTab = "practices" | "about" | "contact";

export const menuTabRoutes: { id: MenuTab; ctaHref: string }[] = [
  { id: "practices", ctaHref: "/" },
  { id: "about", ctaHref: "/about" },
  { id: "contact", ctaHref: "/contact" },
];
