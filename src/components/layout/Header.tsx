"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import FullscreenMenu from "./FullscreenMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkHero, setIsDarkHero] = useState(true);
  const t = useTranslations("common");

  useEffect(() => {
    const hero = document.querySelector("[data-hero-dark]");
    setIsDarkHero(!!hero);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const showLight = isDarkHero && !isMenuOpen;

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-[1000] bg-transparent h-[60px] md:h-[72px]">
        <div className="px-6 sm:px-8 lg:px-12 h-full flex items-center justify-between">
          <Link href="/" className="relative z-[1010]">
            <span
              className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-300 ${
                showLight ? "text-white" : "text-text"
              }`}
            >
              {t("logoText")}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher showLight={showLight} isMenuOpen={isMenuOpen} />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative z-[1010] rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 cursor-pointer ${
                isMenuOpen
                  ? "bg-text text-white"
                  : showLight
                    ? "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                    : "bg-[#003149] text-white hover:bg-[#00405E]"
              }`}
              aria-label={isMenuOpen ? t("menuAriaClose") : t("menuAriaOpen")}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? t("menuClose") : t("menuOpen")}
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
