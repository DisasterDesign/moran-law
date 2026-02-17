export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface PracticeArea {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface HeroData {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export type ThemeColor =
  | "blue-electric"
  | "navy-dark"
  | "orange-bold"
  | "teal-green"
  | "purple-deep"
  | "default";

export interface BulletItem {
  text: string;
}

export interface ContentBlock {
  heading?: string;
  body: string | string[];
  bullets?: BulletItem[];
  highlight?: string;
}
