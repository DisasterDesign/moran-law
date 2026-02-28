"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

const A11Y_KEY = "a11y-settings";

interface A11yState {
  fontSize: number; // 0 = default, 1 = large, 2 = xl
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  stopAnimations: boolean;
  bigCursor: boolean;
}

const DEFAULT_STATE: A11yState = {
  fontSize: 0,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  stopAnimations: false,
  bigCursor: false,
};

function applyClasses(state: A11yState) {
  const root = document.documentElement;

  root.classList.remove("a11y-font-1", "a11y-font-2");
  if (state.fontSize === 1) root.classList.add("a11y-font-1");
  if (state.fontSize === 2) root.classList.add("a11y-font-2");

  root.classList.toggle("a11y-high-contrast", state.highContrast);
  root.classList.toggle("a11y-grayscale", state.grayscale);
  root.classList.toggle("a11y-highlight-links", state.highlightLinks);
  root.classList.toggle("a11y-readable-font", state.readableFont);
  root.classList.toggle("a11y-stop-animations", state.stopAnimations);
  root.classList.toggle("a11y-big-cursor", state.bigCursor);
}

export default function AccessibilityWidget() {
  const t = useTranslations("accessibility");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);

  // Restore saved settings on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(A11Y_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as A11yState;
        setState(parsed);
        applyClasses(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const update = useCallback((partial: Partial<A11yState>) => {
    setState((prev) => {
      const next = { ...prev, ...partial };
      applyClasses(next);
      localStorage.setItem(A11Y_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    applyClasses(DEFAULT_STATE);
    setState(DEFAULT_STATE);
    localStorage.removeItem(A11Y_KEY);
  }, []);

  const cycleFontSize = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, fontSize: (prev.fontSize + 1) % 3 };
      applyClasses(next);
      localStorage.setItem(A11Y_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 start-6 z-50 w-14 h-14 rounded-full bg-[#003149] text-white shadow-lg hover:bg-[#00405E] transition-colors flex items-center justify-center"
        aria-label={open ? t("closeMenu") : t("openMenu")}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="4.5" r="2" fill="currentColor" stroke="none" />
          <path d="M12 7.5v4" />
          <path d="M9 20l3-8.5 3 8.5" />
          <path d="M7 12h10" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 start-6 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          role="dialog"
          aria-label={t("title")}
        >
          {/* Header */}
          <div className="bg-[#003149] text-white px-5 py-3 flex items-center justify-between">
            <h3 className="text-lg font-bold">{t("title")}</h3>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("closeMenu")}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Options */}
          <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
            {/* Font size */}
            <button
              onClick={cycleFontSize}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                state.fontSize > 0
                  ? "bg-[#003149] text-white"
                  : "bg-gray-100 text-text hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">A</span>
              <span>{t("fontSize")}{state.fontSize > 0 ? ` (${state.fontSize === 1 ? "+" : "++"})` : ""}</span>
            </button>

            {/* Toggle options */}
            {([
              { key: "highContrast" as const, icon: "◐", label: t("highContrast") },
              { key: "grayscale" as const, icon: "◑", label: t("grayscale") },
              { key: "highlightLinks" as const, icon: "🔗", label: t("highlightLinks") },
              { key: "readableFont" as const, icon: "Aa", label: t("readableFont") },
              { key: "stopAnimations" as const, icon: "⏸", label: t("stopAnimations") },
              { key: "bigCursor" as const, icon: "➜", label: t("bigCursor") },
            ] as const).map((opt) => (
              <button
                key={opt.key}
                onClick={() => update({ [opt.key]: !state[opt.key] })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  state[opt.key]
                    ? "bg-[#003149] text-white"
                    : "bg-gray-100 text-text hover:bg-gray-200"
                }`}
              >
                <span className="text-lg w-6 text-center">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}

            {/* Reset */}
            <button
              onClick={resetAll}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors mt-2"
            >
              <span className="text-lg w-6 text-center">↺</span>
              <span>{t("resetAll")}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
