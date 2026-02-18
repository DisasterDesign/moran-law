"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

const TILE_BG = "#FF8400";

/* Labor law tiles (side by side) */
const laborTiles = [
  { key: "laborEmployees", href: "/labor-law-employees" },
  { key: "laborEmployers", href: "/labor-law-employers" },
];

/* Featured rectangle tile (completes the row) */
const featuredTile = { key: "allAreas", href: "/about" };

/* Remaining practice area tiles */
const otherTiles = [
  { key: "torts", href: "/torts" },
  { key: "nationalInsurance", href: "/national-insurance" },
  { key: "powerOfAttorney", href: "/power-of-attorney" },
  { key: "mediation", href: "/mediation" },
];

export default function PracticeAreasGrid() {
  const t = useTranslations("practiceAreas");

  return (
    <section className="bg-white">
      {/* Section heading */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-8">
        <AnimatedSection>
          <h2 className="section-heading text-text">{t("sectionTitle")}</h2>
        </AnimatedSection>
      </div>

      <div className="pb-16 md:pb-20 lg:pb-24">
        {/* Top row: 2 labor tiles (50%) + rectangle (50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px]">
          {/* Left half: 2 labor tiles side by side */}
          <div className="grid grid-cols-2 gap-[1px]">
            {laborTiles.map((area, index) => (
              <AnimatedSection key={area.href} delay={index * 0.08}>
                <Link
                  href={area.href}
                  className={`relative aspect-square p-6 md:p-8 flex flex-col justify-center items-center text-center group ${area.key === "laborEmployers" ? "tile-circle-default" : "tile-hover-effect"}`}
                  style={{ background: TILE_BG }}
                >
                  <div className="absolute top-6 start-6 w-3 h-3 bg-white/20" />
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                      {t(`${area.key}.title`)}
                    </h3>
                    <p className="text-white/70 text-base leading-relaxed">
                      {t(`${area.key}.description`)}
                    </p>
                  </div>
                  <div className="absolute bottom-6 start-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white/60 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Right half: rectangle fills row height */}
          <AnimatedSection delay={0.16}>
            <Link
              href={featuredTile.href}
              className="relative h-full min-h-[200px] flex items-center justify-center group tile-hover-effect"
              style={{ background: TILE_BG }}
            >
              <div className="absolute w-[40%] aspect-square rounded-full border-2 border-white/20 group-hover:border-white/30 transition-colors duration-300" />
              <span className="relative text-xl font-bold text-white/80 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-white/40" />
                {t("allAreas")}
              </span>
            </Link>
          </AnimatedSection>
        </div>

        {/* Remaining tiles — 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[1px] mt-[1px]">
          {otherTiles.map((area, index) => (
            <AnimatedSection key={area.href} delay={0.24 + index * 0.08}>
              <Link
                href={area.href}
                className={`relative aspect-[4/3] p-6 md:p-8 flex flex-col justify-center items-center text-center group ${area.key === "mediation" ? "tile-circle-default" : "tile-hover-effect"}`}
                style={{ background: TILE_BG }}
              >
                <div className="absolute top-6 start-6 w-3 h-3 bg-white/20" />
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {t(`${area.key}.title`)}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed">
                    {t(`${area.key}.description`)}
                  </p>
                </div>
                <div className="absolute bottom-6 start-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white/60 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
