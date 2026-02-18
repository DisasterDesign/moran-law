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
  const t = await getTranslations({ locale, namespace: "pages.mediation" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function MediationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.mediation");

  const areas = Array.from({ length: 5 }, (_, i) => t(`areas.${i}`));
  const benefits = Array.from({ length: 4 }, (_, i) => t(`benefits.${i}`));

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
        themeColor="orange-bold"
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

      {/* Mediation areas */}
      <BulletList
        title={t("areasTitle")}
        items={areas}
        columns={3}
        variant="cards"
        themeColor="#FF7D00"
      />

      {/* Key message */}
      <ContentSection>
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-bold text-text leading-relaxed">
            {t("keyMessage")}
          </p>
        </AnimatedSection>
      </ContentSection>

      {/* Benefits */}
      <BulletList
        title={t("benefitsTitle")}
        subtitle={t("benefitsSubtitle")}
        items={benefits}
        columns={2}
        variant="checkmarks"
        themeColor="#FF7D00"
      />

      <CTABanner
        title={t("ctaTitle")}
        ctaText={t("ctaCta")}
      />

      <WhatsAppForm defaultSubject="mediation" />
    </>
  );
}
