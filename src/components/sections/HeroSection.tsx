"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import type { HeroData, ThemeColor } from "@/types";

interface HeroSectionProps {
  data: HeroData;
  backgroundImage?: string;
  themeColor?: ThemeColor;
  pageLabel?: string;
}

const colorMap: Record<string, string> = {
  "blue-electric": "#00A1C0",
  "navy-dark": "#003149",
  "orange-bold": "#FF7D00",
  "teal-green": "#7BCCEA",
  "purple-deep": "#003149",
  default: "#003149",
};

export default function HeroSection({
  data,
  backgroundImage,
  themeColor = "default",
  pageLabel,
}: HeroSectionProps) {
  const bgColor = colorMap[themeColor] || colorMap.default;

  return (
    <section
      data-hero-dark
      className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Optional background image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Geometric decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large circle */}
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ backgroundColor: "white" }}
        />
        {/* Small squares */}
        <div className="absolute top-20 left-10 w-8 h-8 opacity-[0.05] bg-white" />
        <div className="absolute top-32 left-24 w-4 h-4 opacity-[0.07] bg-white" />
        <div className="absolute bottom-40 right-20 w-6 h-6 opacity-[0.05] bg-white" />
      </div>

      {/* Gradient bottom fade to cream */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 w-full">
        {/* Page indicator pill */}
        {pageLabel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#003149] px-5 py-1.5 text-sm text-white hover:bg-[#00405E] transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {pageLabel}
            </Link>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="display-heading text-white mb-6">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-xl md:text-2xl text-white/85 mb-4 font-light leading-relaxed">
              {data.subtitle}
            </p>
          )}
          {data.description && (
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              {data.description}
            </p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button href={data.ctaHref} variant="pill-white">
              {data.ctaText}
            </Button>
            {data.secondaryCta && (
              <Button href={data.secondaryCta.href} variant="whatsapp">
                {data.secondaryCta.text}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
