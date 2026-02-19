"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { PHONE_NUMBER, EMAIL } from "@/lib/constants";
import { LOGO_PATH } from "@/data/logo";

export default function Footer() {
  const tc = useTranslations("common");
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & description */}
          <div>
            <Link href="/" aria-label={tc("logoText")}>
              <svg
                viewBox="0 0 515 385"
                className="h-[48px] w-auto"
                style={{ filter: "drop-shadow(0 0 2px rgba(0,49,73,0.6))" }}
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={LOGO_PATH}
                  fill="white"
                />
              </svg>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mt-3 max-w-xs">
              {tFooter("description")}
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-text uppercase tracking-wide">{tc("quickNav")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-text-secondary hover:text-text transition-colors text-sm">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-text transition-colors text-sm">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/#practice-areas" className="text-text-secondary hover:text-text transition-colors text-sm">
                  {tFooter("services")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-text transition-colors text-sm">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-text uppercase tracking-wide">{tc("contactTitle")}</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              {PHONE_NUMBER && (
                <li>
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-text transition-colors">
                    {PHONE_NUMBER}
                  </a>
                </li>
              )}
              {EMAIL && (
                <li>
                  <a href={`mailto:${EMAIL}`} className="hover:text-text transition-colors">
                    {EMAIL}
                  </a>
                </li>
              )}
              {!PHONE_NUMBER && !EMAIL && (
                <li className="text-text-secondary/50 text-xs mt-4">
                  {tc("comingSoon")}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-6">
        <Container>
          <p className="text-center text-sm text-text-secondary/60">
            &copy; {currentYear} {tc("siteName")}. {tc("allRightsReserved")}
          </p>
          <p className="text-center text-xs text-text-secondary/40 mt-2">
            Built by{" "}
            <a
              href="https://www.fuzionwebz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-secondary/60 transition-colors underline"
            >
              Fuzion
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
