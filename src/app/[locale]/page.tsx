import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import PracticeAreasGrid from "@/components/sections/PracticeAreasGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTABanner from "@/components/sections/CTABanner";
import WhatsAppForm from "@/components/forms/WhatsAppForm";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.home");

  return (
    <>
      <HeroSection
        data={{
          title: t("heroTitle"),
          subtitle: t("heroSubtitle"),
          description: t("heroDescription"),
          ctaText: t("heroCta"),
          ctaHref: "/contact",
          secondaryCta: { text: t("heroWhatsApp"), href: "#whatsapp-form" },
        }}
        backgroundImage="/images/moran-portrait-full.jpg"
        themeColor="navy-dark"
      />
      <PracticeAreasGrid />
      <WhyChooseUs />
      <CTABanner title={t("ctaTitle")} ctaText={t("ctaCta")} />
      <WhatsAppForm />
    </>
  );
}
