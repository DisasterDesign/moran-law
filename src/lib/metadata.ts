const BASE_URL = "https://www.moransudryhen.co.il";

export function getLegalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "משרד עורכי דין מורן סודרי חן",
    description:
      "עורכת דין מורן סודרי חן, משרד עורכי דין המתמחה בדיני עבודה, נזיקין, ביטוח לאומי, ייפוי כוח מתמשך וגישור",
    url: BASE_URL,
    image: `${BASE_URL}/opengraph-image`,
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    knowsLanguage: ["he", "en"],
    serviceType: [
      "דיני עבודה",
      "נזיקין",
      "ביטוח לאומי",
      "ייפוי כוח מתמשך",
      "גישור",
    ],
    founder: {
      "@type": "Person",
      name: "מורן סודרי חן",
    },
  };
}

export function getAttorneySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: "מורן סודרי חן",
    alternateName: "Moran Sudry Hen",
    jobTitle: "עורכת דין",
    description:
      "עורכת דין מורן סודרי חן, למעלה מ-15 שנות ניסיון בדיני עבודה, נזיקין, ביטוח לאומי, ייפוי כוח מתמשך וגישור",
    url: `${BASE_URL}/he/about`,
    image: `${BASE_URL}/opengraph-image`,
    knowsAbout: [
      "דיני עבודה",
      "נזיקין",
      "ביטוח לאומי",
      "ייפוי כוח מתמשך",
      "גישור",
    ],
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    knowsLanguage: ["he", "en"],
  };
}
