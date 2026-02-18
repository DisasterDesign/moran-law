import { getTranslations, setRequestLocale } from "next-intl/server";
import HomePageClient from "@/components/sections/HomePageClient";
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
    <HomePageClient>
      <PracticeAreasGrid />
      <WhyChooseUs />
      <CTABanner title={t("ctaTitle")} ctaText={t("ctaCta")} />
      <WhatsAppForm />
    </HomePageClient>
  );
}
