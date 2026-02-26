"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroCanvas from "./HeroCanvas";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

const practiceAreaRoutes: Record<string, string> = {
  // Hebrew
  "דיני עבודה עובדים": "/labor-law-employees",
  "דיני עבודה מעסיקים": "/labor-law-employers",
  "נזיקין": "/torts",
  "ביטוח לאומי": "/national-insurance",
  "ייפוי כוח מתמשך": "/power-of-attorney",
  "גישור": "/mediation",
  // English
  "Labor Law Employees": "/labor-law-employees",
  "Labor Law Employers": "/labor-law-employers",
  "Torts": "/torts",
  "National Insurance": "/national-insurance",
  "Power of Attorney": "/power-of-attorney",
  "Mediation": "/mediation",
};

export default function HomeHero({ introDone = true }: { introDone?: boolean }) {
  const t = useTranslations("pages.home");
  const practiceAreas = t("heroSubtitle").split("|").map((s: string) => s.trim());

  return (
    <section
      data-hero-dark
      className={`relative w-full h-screen flex flex-col justify-center items-center overflow-hidden${!introDone ? " hero-paused" : ""}`}
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #004466 0%, #003149 40%, #001e2d 100%)",
      }}
    >
      {/* Canvas animation */}
      <HeroCanvas paused={!introDone} />

      {/* Ambient glows */}
      <div
        className="absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full pointer-events-none animate-glow-drift"
        style={{ background: "rgba(0,161,192,0.07)", filter: "blur(80px)" }}
      />
      <div
        className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full pointer-events-none animate-glow-drift"
        style={{
          background: "rgba(37,99,235,0.05)",
          filter: "blur(80px)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none animate-glow-drift"
        style={{
          background: "rgba(123,204,234,0.04)",
          filter: "blur(80px)",
          animationDelay: "-8s",
        }}
      />

      {/* Corner geometric accents */}
      <div className="absolute top-[100px] end-12 z-[5] opacity-0 animate-fade-in-late pointer-events-none">
        <div className="inline-block w-2 h-2 border border-[rgba(37,99,235,0.25)] m-1.5" />
        <div className="inline-block w-2 h-2 border border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.15)] m-1.5" />
        <br />
        <div className="inline-block w-2 h-2 border border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.15)] m-1.5" />
        <div className="inline-block w-2 h-2 border border-[rgba(37,99,235,0.25)] m-1.5" />
      </div>
      <div className="absolute bottom-20 start-12 z-[5] opacity-0 animate-fade-in-late pointer-events-none">
        <div className="inline-block w-2 h-2 border border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.15)] m-1.5" />
        <div className="inline-block w-2 h-2 border border-[rgba(37,99,235,0.25)] m-1.5" />
        <br />
        <div className="inline-block w-2 h-2 border border-[rgba(37,99,235,0.25)] m-1.5" />
        <div className="inline-block w-2 h-2 border border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.15)] m-1.5" />
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center px-6">
        {/* Title rises UP from the line */}
        <div className="overflow-hidden inline-block">
          <h1 className="font-bold text-white leading-none animate-rise-up">
            <span className="block text-[clamp(38px,6vw,80px)]">
              {t("heroTitle")}
            </span>
            <span className="block text-[clamp(22px,3vw,40px)] font-light text-white/70 mt-2">
              {t("heroTitleLine2")}
            </span>
          </h1>
        </div>

        {/* Orange line — stretches from center */}
        <div
          className="h-0.5 w-20 mx-auto mt-4 mb-7 origin-center animate-line-stretch"
          style={{
            background:
              "linear-gradient(90deg, transparent, #2563EB, transparent)",
          }}
        />

        {/* Practice areas descend DOWN from the line */}
        <div className="flex justify-center gap-6 md:gap-8 mb-8 flex-wrap">
          {practiceAreas.map((area: string, i: number) => {
            const href = practiceAreaRoutes[area] || "/";
            const animIndex = Math.min(i + 1, 6);
            return (
              <Link
                key={i}
                href={href}
                className={`text-[clamp(15px,1.8vw,20px)] font-light text-white/50 tracking-wider hover:text-white/90 transition-colors duration-300 animate-fade-down-${animIndex}${
                  i > 0
                    ? " relative before:content-[''] before:absolute before:-start-3 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-[#2563EB] before:opacity-60"
                    : ""
                }`}
              >
                {area}
              </Link>
            );
          })}
        </div>

        <p className="text-[clamp(17px,2vw,22px)] font-light text-white/70 leading-relaxed max-w-[580px] mx-auto animate-fade-down-tag">
          {t("heroDescription")}
        </p>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
