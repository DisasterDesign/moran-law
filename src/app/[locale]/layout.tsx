import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { IBM_Plex_Sans_Hebrew } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import { getLegalServiceSchema } from "@/lib/metadata";

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

  return {
    title: {
      default: t("metaTitle"),
      template: t("metaTitleTemplate"),
    },
    description: t("metaDescription"),
    openGraph: {
      locale: locale === "he" ? "he_IL" : "en_US",
      type: "website",
      siteName: tc("siteName"),
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
