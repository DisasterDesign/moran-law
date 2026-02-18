"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

interface LanguageSwitcherProps {
  showLight: boolean;
  isMenuOpen: boolean;
}

export default function LanguageSwitcher({
  showLight,
  isMenuOpen,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("languageSwitcher");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "he" | "en" });
    setIsOpen(false);
  };

  const buttonColorClass = isMenuOpen
    ? "bg-text text-white"
    : showLight
      ? "bg-white/10 text-white border border-white/30 hover:bg-white/20"
      : "bg-[#003149] text-white hover:bg-[#00405E]";

  return (
    <div ref={ref} className="relative z-[1010]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${buttonColorClass}`}
        style={{ filter: "drop-shadow(2px 2px 2px rgba(255,132,0,0.8))" }}
        aria-label={t("ariaLabel")}
        aria-expanded={isOpen}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.97.633-3.793 1.708-5.277"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 end-0 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px]">
          <button
            onClick={() => switchLocale("he")}
            className={`w-full text-start px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 cursor-pointer ${
              locale === "he" ? "font-bold text-text" : "text-text-secondary"
            }`}
          >
            {t("hebrew")}
          </button>
          <button
            onClick={() => switchLocale("en")}
            className={`w-full text-start px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 cursor-pointer ${
              locale === "en" ? "font-bold text-text" : "text-text-secondary"
            }`}
          >
            {t("english")}
          </button>
        </div>
      )}
    </div>
  );
}
