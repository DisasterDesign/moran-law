import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ContentSection from "@/components/sections/ContentSection";
import WhatsAppForm from "@/components/forms/WhatsAppForm";
import AnimatedSection from "@/components/ui/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");

  return (
    <>
      <HeroSection
        data={{
          title: t("heroTitle"),
          subtitle: t("heroSubtitle"),
          description: t("heroDescription"),
          ctaText: t("heroCta"),
          ctaHref: "/contact",
        }}
        themeColor="navy-dark"
        pageLabel={t("pageLabel")}
      />

      {/* Bio Section */}
      <ContentSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <AnimatedSection direction="right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/moran-portrait-stool.jpg"
                alt={t("imageAlt")}
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </AnimatedSection>

          {/* Biography */}
          <AnimatedSection direction="left">
            <div className="space-y-5 text-text leading-relaxed">
              <p>{t("bio1")}</p>
              <p>{t("bio2")}</p>
              <p>{t("bio3")}</p>
              <p>{t("bio4")}</p>
              <p className="text-text font-bold text-lg">{t("bio5")}</p>
            </div>
          </AnimatedSection>
        </div>
      </ContentSection>

      <WhatsAppForm />
    </>
  );
}
