"use client";

import { useTranslations } from "next-intl";
import HeroCanvas from "./HeroCanvas";

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
          background: "rgba(255,125,0,0.05)",
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
        <div className="inline-block w-2 h-2 border border-[rgba(255,125,0,0.25)] m-1.5" />
        <div className="inline-block w-2 h-2 border border-[rgba(255,125,0,0.3)] bg-[rgba(255,125,0,0.15)] m-1.5" />
        <br />
        <div className="inline-block w-2 h-2 border border-[rgba(255,125,0,0.3)] bg-[rgba(255,125,0,0.15)] m-1.5" />
        <div className="inline-block w-2 h-2 border border-[rgba(255,125,0,0.25)] m-1.5" />
      </div>
      <div className="absolute bottom-20 start-12 z-[5] opacity-0 animate-fade-in-late pointer-events-none">
        <div className="inline-block w-2 h-2 border border-[rgba(255,125,0,0.3)] bg-[rgba(255,125,0,0.15)] m-1.5" />
        <div className="inline-block w-2 h-2 border border-[rgba(255,125,0,0.25)] m-1.5" />
        <br />
        <div className="inline-block w-2 h-2 border border-[rgba(255,125,0,0.25)] m-1.5" />
        <div className="inline-block w-2 h-2 border border-[rgba(255,125,0,0.3)] bg-[rgba(255,125,0,0.15)] m-1.5" />
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center px-6">
        <div className="overflow-hidden inline-block">
          <h1 className="text-[clamp(45px,7.2vw,96px)] font-bold text-white leading-none mb-4 animate-slide-up">
            {t("heroTitle")}
          </h1>
        </div>

        <div
          className="h-0.5 mx-auto mb-7 animate-line-grow"
          style={{
            background:
              "linear-gradient(90deg, transparent, #FF7D00, transparent)",
          }}
        />

        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          {practiceAreas.map((area: string, i: number) => (
            <span
              key={i}
              className={`text-[clamp(13px,1.4vw,16px)] font-light text-white/50 tracking-wider opacity-0 animate-fade-up-${i + 1}${
                i > 0
                  ? " relative before:content-[''] before:absolute before:-start-4 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-[#FF7D00] before:opacity-60"
                  : ""
              }`}
            >
              {area}
            </span>
          ))}
        </div>

        <p className="text-[clamp(17px,2vw,22px)] font-light text-white/70 leading-relaxed max-w-[580px] mx-auto opacity-0 animate-fade-up-tag">
          {t("heroDescription")}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 opacity-0 animate-fade-in-scroll">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7D00] animate-scroll-pulse" />
        <div
          className="w-px h-9"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
          }}
        />
      </div>
    </section>
  );
}
