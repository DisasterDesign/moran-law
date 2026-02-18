import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ContentSection from "@/components/sections/ContentSection";
import BulletList from "@/components/sections/BulletList";
import CTABanner from "@/components/sections/CTABanner";
import WhatsAppForm from "@/components/forms/WhatsAppForm";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.powerOfAttorney" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function PowerOfAttorneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.powerOfAttorney");

  const processSteps = Array.from({ length: 5 }, (_, i) => ({
    step: String(i + 1),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
  }));

  const controlItems = Array.from({ length: 4 }, (_, i) => t(`controlItems.${i}`));
  const familyItems = Array.from({ length: 4 }, (_, i) => t(`familyItems.${i}`));

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
            text: t("heroSecondaryCta"),
            href: "/contact",
          },
        }}
        themeColor="purple-deep"
        pageLabel={t("pageLabel")}
      />

      {/* The real question */}
      <ContentSection>
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
            {t("realQuestionTitle")}
          </h2>
          <p className="text-lg text-text leading-relaxed mb-4">
            {t("realQuestionP1")}
          </p>
          <p className="text-text-secondary leading-relaxed">
            {t("realQuestionP2")}
          </p>
        </AnimatedSection>
      </ContentSection>

      {/* Control */}
      <BulletList
        title={t("controlTitle")}
        items={controlItems}
        columns={2}
        variant="checkmarks"
        themeColor="#003149"
      />

      {/* Why it matters for family */}
      <ContentSection className="bg-white">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
            {t("familyTitle")}
          </h2>
          <p className="text-lg text-text leading-relaxed mb-6">
            {t("familyIntro")}
          </p>
          <ul className="space-y-3 mb-6">
            {familyItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent font-bold mt-0.5">&#x2022;</span>
                <span className="text-text leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-text font-bold text-lg">
            {t("familyConclusion")}
          </p>
        </AnimatedSection>
      </ContentSection>

      {/* Document of love */}
      <ContentSection>
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
            {t("loveTitle")}
          </h2>
          <p className="text-lg text-text leading-relaxed mb-4">
            {t("loveP1")}
          </p>
          <p className="text-text-secondary leading-relaxed">
            {t("loveP2")}
          </p>
        </AnimatedSection>
      </ContentSection>

      {/* Process steps */}
      <section className="section-padding bg-white">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title={t("processTitle")}
              subtitle={t("processSubtitle")}
              centered
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-6">
            {processSteps.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-purple-deep text-white flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Warning */}
      <ContentSection className="!bg-purple-deep text-white">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t("warningTitle")}
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            {t("warningText")}
          </p>
        </AnimatedSection>
      </ContentSection>

      <CTABanner
        title={t("ctaTitle")}
        ctaText={t("ctaCta")}
      />

      <WhatsAppForm defaultSubject="power-of-attorney" />
    </>
  );
}
