export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972506984909";
export const PHONE_NUMBER = "050-698-4909";
export const EMAIL = "m.law.adv@gmail.com";


export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61587209845573",
  instagram: "https://www.instagram.com/m.law.adv/",
  linkedin: "https://www.linkedin.com/in/moran-sudry-hen-b8b0313a9/",
  tiktok: "https://www.tiktok.com/@moran.sudry.hen.adv",
  youtube: "https://www.youtube.com/@m.Adv-law",
} as const;

export const WHATSAPP_SUBJECT_KEYS = [
  "labor-employees",
  "labor-employers",
  "torts",
  "national-insurance",
  "power-of-attorney",
  "mediation",
  "other",
] as const;
