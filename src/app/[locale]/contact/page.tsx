import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import WhatsAppForm from "@/components/forms/WhatsAppForm";

export const runtime = "edge";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { PHONE_NUMBER, ADDRESS, WHATSAPP_NUMBER } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");

  return (
    <>
      <HeroSection
        data={{
          title: t("heroTitle"),
          subtitle: t("heroSubtitle"),
          ctaText: t("heroCta"),
          ctaHref: `https://wa.me/${WHATSAPP_NUMBER}`,
        }}
        themeColor="navy-dark"
        pageLabel={t("pageLabel")}
      />

      {/* Contact Tile Grid */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <h2 className="section-heading text-text mb-8">{t("contactMethodsTitle")}</h2>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px]">
          {/* Phone */}
          <AnimatedSection delay={0}>
            <a
              href={PHONE_NUMBER ? `tel:${PHONE_NUMBER}` : "#"}
              className="block p-8 bg-tile-neutral group tile-hover-effect text-center flex flex-col items-center justify-center min-h-[140px]"
              style={{ '--tile-color': '#FF7D00' } as CSSProperties}
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-white">{t("phone")}</h3>
              <p className="text-text-secondary text-sm group-hover:text-white/70">
                {PHONE_NUMBER || t("comingSoon")}
              </p>
            </a>
          </AnimatedSection>

          {/* WhatsApp */}
          <AnimatedSection delay={0.1}>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 bg-whatsapp text-white tile-hover-effect text-center flex flex-col items-center justify-center min-h-[140px]"
            >
              <h3 className="text-lg font-bold mb-2">{t("whatsapp")}</h3>
              <p className="text-white/70 text-sm">{t("whatsappDirect")}</p>
            </a>
          </AnimatedSection>

          {/* Location */}
          <AnimatedSection delay={0.2}>
            <div className="p-8 bg-tile-neutral tile-hover-effect text-center flex flex-col items-center justify-center min-h-[140px]">
              <h3 className="text-lg font-bold text-text mb-2">{t("address")}</h3>
              <p className="text-text-secondary text-sm">
                {ADDRESS || t("comingSoon")}
              </p>
            </div>
          </AnimatedSection>

          {/* Form scroll */}
          <AnimatedSection delay={0.3}>
            <a
              href="#whatsapp-form"
              className="block p-8 bg-[#003149] text-white tile-hover-effect text-center flex flex-col items-center justify-center min-h-[140px]"
            >
              <h3 className="text-lg font-bold mb-2">{t("formTitle")}</h3>
              <p className="text-white/70 text-sm">{t("formDescription")}</p>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="overflow-hidden bg-tile-neutral h-64 flex items-center justify-center">
            <p className="text-text-secondary">
              {t("mapPlaceholder")}
            </p>
          </div>
        </div>
      </section>

      <WhatsAppForm
        title={t("formSectionTitle")}
        subtitle={t("formSectionSubtitle")}
      />
    </>
  );
}
