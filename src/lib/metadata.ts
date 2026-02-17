export function getLegalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "משרד עורכי דין מורן סודרי חן",
    description:
      "משרד עורכי דין המתמחה בדיני עבודה, נזיקין, ביטוח לאומי וייפוי כוח מתמשך",
    url: "https://www.moransudryhen.co.il",
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
    ],
  };
}

export function getAttorneySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: "מורן סודרי חן",
    jobTitle: "עורכת דין",
    description:
      "עורכת דין עם למעלה מ-15 שנות ניסיון בדיני עבודה, נזיקין וביטוח לאומי",
    url: "https://www.moransudryhen.co.il/about",
    knowsAbout: [
      "דיני עבודה",
      "נזיקין",
      "ביטוח לאומי",
      "ייפוי כוח מתמשך",
    ],
  };
}
