import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContentSection from "@/components/sections/ContentSection";
import AnimatedSection from "@/components/ui/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacyPolicy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.privacyPolicy");

  const sections = [
    { title: t("generalTitle"), text: t("generalText") },
    { title: t("collectedTitle"), text: t("collectedText") },
    { title: t("purposeTitle"), text: t("purposeText") },
    { title: t("cookiesTitle"), text: t("cookiesText") },
    { title: t("sharingTitle"), text: t("sharingText") },
    { title: t("securityTitle"), text: t("securityText") },
    { title: t("rightsTitle"), text: t("rightsText") },
    { title: t("updatesTitle"), text: t("updatesText") },
    { title: t("contactTitle"), text: t("contactText") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#003149] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <h1 className="display-heading text-white mb-4">{t("heroTitle")}</h1>
            <p className="text-xl text-white/70">{t("heroDescription")}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <ContentSection>
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((section, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <h2 className="text-2xl font-bold text-text mb-3">
                {section.title}
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {section.text}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
