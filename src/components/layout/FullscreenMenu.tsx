"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { practiceAreaRoutes, menuTabRoutes, type MenuTab } from "@/data/navigation";
import { SOCIAL_LINKS, WHATSAPP_NUMBER, PHONE_NUMBER } from "@/lib/constants";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>("practices");
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<MenuTab | null>("practices");

  const t = useTranslations("common");
  const tTabs = useTranslations("menuTabs");
  const tPractice = useTranslations("practiceAreaLinks");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      const timer = setTimeout(() => firstLinkRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) { setActiveTab("practices"); setOpenAccordion("practices"); }
  }, [isOpen]);

  const currentTab = menuTabRoutes.find((tab) => tab.id === activeTab)!;
  const col1 = practiceAreaRoutes.slice(0, 3);
  const col2 = practiceAreaRoutes.slice(3);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
          className="fixed inset-0 z-[1000] overflow-y-auto bg-white" role="dialog" aria-modal="true" aria-label={t("menuAriaLabel")}>
          <div className="h-[60px] md:h-[72px]" />
          <motion.div variants={contentVariants} initial="hidden" animate="visible" exit="exit"
            className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-8 md:py-12">

            {!isMobile && (
              <>
                <div className="flex items-center gap-8 mb-10 border-b border-gray-200 pb-4">
                  {menuTabRoutes.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`relative pb-2 text-base transition-all duration-200 cursor-pointer ${activeTab === tab.id ? "text-text font-bold" : "text-[#888] font-normal hover:text-text"}`}>
                      {tTabs(`${tab.id}.label`)}
                      {activeTab === tab.id && (
                        <motion.div layoutId="tab-underline" className="absolute bottom-0 right-0 left-0 h-[2px] bg-text" transition={{ duration: 0.2 }} />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-text mb-2">{tTabs(`${activeTab}.title`)}</h3>
                  <p className="text-text-secondary mb-4">{tTabs(`${activeTab}.description`)}</p>
                  <Link href={currentTab.ctaHref} onClick={onClose} ref={firstLinkRef}
                    className="inline-flex items-center gap-2 rounded-full border border-text px-5 py-2 text-sm font-bold text-text hover:bg-text hover:text-white transition-colors duration-200">
                    {tTabs(`${activeTab}.ctaLabel`)}
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>

                {activeTab === "practices" && (
                  <div className="grid grid-cols-2 gap-x-16 gap-y-3 max-w-lg">
                    <ul className="space-y-3">
                      {col1.map((route) => (
                        <li key={route.href}>
                          <Link href={route.href} onClick={onClose} className="group/link inline-flex items-center text-[#666] transition-colors duration-200 hover:text-text">
                            <span className="relative">{tPractice(route.key)}
                              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-text origin-right scale-x-0 transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-3">
                      {col2.map((route) => (
                        <li key={route.href}>
                          <Link href={route.href} onClick={onClose} className="group/link inline-flex items-center text-[#666] transition-colors duration-200 hover:text-text">
                            <span className="relative">{tPractice(route.key)}
                              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-text origin-right scale-x-0 transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {isMobile && (
              <div className="space-y-0">
                {menuTabRoutes.map((tab) => (
                  <div key={tab.id} className="border-b border-gray-200">
                    <button onClick={() => setOpenAccordion(openAccordion === tab.id ? null : tab.id)}
                      className="w-full flex items-center justify-between py-4 text-lg font-bold text-text cursor-pointer">
                      {tTabs(`${tab.id}.label`)}
                      <svg className={`w-5 h-5 transition-transform duration-200 ${openAccordion === tab.id ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openAccordion === tab.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="pb-4">
                            <p className="text-text-secondary text-sm mb-3">{tTabs(`${tab.id}.description`)}</p>
                            {tab.id === "practices" && (
                              <ul className="space-y-2 mb-3">
                                {practiceAreaRoutes.map((route) => (
                                  <li key={route.href}>
                                    <Link href={route.href} onClick={onClose} className="block text-[#666] py-1 hover:text-text transition-colors">
                                      {tPractice(route.key)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <Link href={tab.ctaHref} onClick={onClose}
                              className="inline-flex items-center gap-2 rounded-full border border-text px-4 py-1.5 text-sm font-bold text-text">
                              {tTabs(`${tab.id}.ctaLabel`)}
                              <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            <div className="my-10 h-[1px] bg-gray-200" />
            <div className="flex flex-wrap items-center gap-6 text-[#888]">
              {PHONE_NUMBER && (<a href={`tel:${PHONE_NUMBER}`} className="hover:text-text transition-colors text-sm">{PHONE_NUMBER}</a>)}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-whatsapp transition-colors" aria-label="WhatsApp">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors" aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors" aria-label="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
