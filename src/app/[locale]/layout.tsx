import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { IBM_Plex_Sans_Hebrew } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import { getLegalServiceSchema, getAttorneySchema } from "@/lib/metadata";

const ibmPlex = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-var",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.home" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const baseUrl = "https://www.moransudryhen.co.il";
  const altLocale = locale === "he" ? "en" : "he";

  return {
    title: {
      default: t("metaTitle"),
      template: t("metaTitleTemplate"),
    },
    description: t("metaDescription"),
    keywords:
      locale === "he"
        ? [
            "עורכת דין מורן סודרי",
            "מורן סודרי חן",
            "עורכת דין דיני עבודה",
            "עורכת דין נזיקין",
            "ביטוח לאומי",
            "ייפוי כוח מתמשך",
            "גישור",
            "משרד עורכי דין",
          ]
        : [
            "Attorney Moran Sudry Hen",
            "labor law attorney Israel",
            "torts lawyer",
            "national insurance",
            "power of attorney",
            "mediation",
          ],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: { [altLocale]: `${baseUrl}/${altLocale}` },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${baseUrl}/${locale}`,
      locale: locale === "he" ? "he_IL" : "en_US",
      type: "website",
      siteName: tc("siteName"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "he" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={ibmPlex.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLegalServiceSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getAttorneySchema()),
          }}
        />
      </head>
      <body className="font-ibm-plex bg-cream text-text antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFAB />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
