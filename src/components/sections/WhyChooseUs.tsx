"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

function CounterNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  const stats = [
    { number: 15, suffix: "+", label: t("stats.years.label") },
    { number: 1000, suffix: "+", label: t("stats.cases.label") },
    { number: 2, suffix: "", label: t("stats.sides.label") },
  ];

  const reasons = [0, 1, 2, 3, 4].map((i) => t(`reasons.${i}`));

  return (
    <section>
      {/* Stats Tile Grid */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-8">
        <AnimatedSection>
          <h2 className="section-heading text-text mb-0">{t("title")}</h2>
        </AnimatedSection>
      </div>

      <div className="pb-16 md:pb-20 lg:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px]">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className={`bg-navy-dark aspect-[4/3] p-6 md:p-8 flex flex-col justify-center items-center text-center ${index === 1 ? "tile-circle-default" : "tile-hover-effect"}`}>
                <div className="text-white font-bold leading-none mb-2" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
                  <CounterNumber target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-white/80 text-sm font-light">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}

          {/* Circle tile */}
          <AnimatedSection delay={0.3}>
            <div className="bg-navy-dark aspect-[4/3] flex items-center justify-center relative overflow-hidden tile-hover-effect">
              <div className="absolute w-[70%] aspect-square rounded-full bg-white/10" />
              <p className="relative text-white text-center font-bold text-lg leading-snug px-4">
                {t("circleTile")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Reasons list */}
      <div className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl">
            {reasons.map((reason, index) => (
              <AnimatedSection key={index} delay={index * 0.06}>
                <div className="flex items-start gap-3 py-2">
                  {/* Square bullet */}
                  <span className="shrink-0 mt-2 w-2.5 h-2.5 bg-navy-dark" />
                  <p className="text-text font-medium leading-relaxed">{reason}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
