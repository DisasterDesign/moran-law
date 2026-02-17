import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ContentSection from "@/components/sections/ContentSection";
import BulletList from "@/components/sections/BulletList";
import CTABanner from "@/components/sections/CTABanner";
import WhatsAppForm from "@/components/forms/WhatsAppForm";
import AnimatedSection from "@/components/ui/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.laborEmployers" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function LaborLawEmployersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.laborEmployers");

  const exposures = Array.from({ length: 7 }, (_, i) => t(`exposures.${i}`));
  const services = Array.from({ length: 6 }, (_, i) => t(`services.${i}`));

  return (
    <>
      <HeroSection
        data={{
          title: t("heroTitle"),
          subtitle: t("heroSubtitle"),
          description: t("heroDescription"),
          ctaText: t("heroCta"),
          ctaHref: "/contact",
          secondaryCta: {
            text: t("heroWhatsApp"),
            href: "#whatsapp-form",
          },
        }}
        themeColor="navy-dark"
        pageLabel={t("pageLabel")}
      />

      {/* Intro */}
      <ContentSection>
        <AnimatedSection className="max-w-3xl mx-auto">
          <p className="text-lg text-text leading-relaxed mb-6">
            {t("intro")}
          </p>
        </AnimatedSection>
      </ContentSection>

      {/* Legal exposures */}
      <BulletList
        title={t("exposuresTitle")}
        items={exposures}
        columns={2}
        variant="cards"
        themeColor="#003149"
      />

      {/* Key message */}
      <ContentSection>
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-bold text-text leading-relaxed">
            {t("keyMessage")}
          </p>
        </AnimatedSection>
      </ContentSection>

      {/* Services */}
      <BulletList
        title={t("servicesTitle")}
        subtitle={t("servicesSubtitle")}
        items={services}
        columns={2}
        variant="checkmarks"
        themeColor="#003149"
      />

      <CTABanner
        title={t("ctaTitle")}
        ctaText={t("ctaCta")}
      />

      <WhatsAppForm defaultSubject="labor-employers" />
    </>
  );
}
