import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ContentSection from "@/components/sections/ContentSection";
import BulletList from "@/components/sections/BulletList";

export const runtime = "edge";
import CTABanner from "@/components/sections/CTABanner";
import WhatsAppForm from "@/components/forms/WhatsAppForm";
import AnimatedSection from "@/components/ui/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.nationalInsurance" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function NationalInsurancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.nationalInsurance");

  const cases = Array.from({ length: 7 }, (_, i) => t(`cases.${i}`));
  const services = Array.from({ length: 4 }, (_, i) => t(`services.${i}`));

  return (
    <>
      <HeroSection
        data={{
          title: t("heroTitle"),
          description: t("heroDescription"),
          ctaText: t("heroCta"),
          ctaHref: "/contact",
          secondaryCta: {
            text: t("heroWhatsApp"),
            href: "#whatsapp-form",
          },
        }}
        themeColor="teal-green"
        pageLabel={t("pageLabel")}
      />

      {/* Intro */}
      <ContentSection>
        <AnimatedSection className="max-w-3xl mx-auto">
          <p className="text-lg text-text leading-relaxed">
            {t("intro")}
          </p>
        </AnimatedSection>
      </ContentSection>

      {/* Cases */}
      <BulletList
        title={t("casesTitle")}
        items={cases}
        columns={2}
        variant="cards"
        themeColor="#00A1C0"
      />

      {/* Services */}
      <BulletList
        title={t("servicesTitle")}
        items={services}
        columns={2}
        variant="checkmarks"
        themeColor="#00A1C0"
      />

      {/* Key message */}
      <ContentSection className="bg-white">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <p className="text-2xl font-bold text-text leading-relaxed">
            {t("keyMessage")}
          </p>
        </AnimatedSection>
      </ContentSection>

      <CTABanner
        title={t("ctaTitle")}
        ctaText={t("ctaCta")}
      />

      <WhatsAppForm defaultSubject="national-insurance" />
    </>
  );
}
