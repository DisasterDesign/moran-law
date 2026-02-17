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
  const t = await getTranslations({ locale, namespace: "pages.laborEmployees" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function LaborLawEmployeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.laborEmployees");

  const situations = Array.from({ length: 8 }, (_, i) => t(`situations.${i}`));
  const whyActItems = Array.from({ length: 4 }, (_, i) => t(`whyActItems.${i}`));

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
        themeColor="orange-bold"
        pageLabel={t("pageLabel")}
      />

      {/* Intro */}
      <ContentSection>
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-lg text-text leading-relaxed mb-6">
              {t("intro1")}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t("intro2")}
            </p>
            <p className="text-xl font-bold text-text mt-6">
              {t("intro3")}
            </p>
          </AnimatedSection>
        </div>
      </ContentSection>

      {/* Situations */}
      <BulletList
        title={t("situationsTitle")}
        items={situations}
        columns={2}
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

      {/* Why act now */}
      <BulletList
        title={t("whyActTitle")}
        subtitle={t("whyActSubtitle")}
        items={whyActItems}
        columns={2}
        variant="checkmarks"
        themeColor="#FF7D00"
      />

      {/* Personal section */}
      <ContentSection className="bg-white">
        <AnimatedSection className="max-w-3xl mx-auto">
          <p className="text-lg text-text leading-relaxed italic border-r-4 border-accent pr-6">
            {t("personalQuote")}
          </p>
        </AnimatedSection>
      </ContentSection>

      <CTABanner
        title={t("ctaTitle")}
        ctaText={t("ctaCta")}
      />

      <WhatsAppForm defaultSubject="labor-employees" />
    </>
  );
}
