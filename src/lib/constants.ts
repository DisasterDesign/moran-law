export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972506984909";
export const PHONE_NUMBER = ""; // placeholder
export const EMAIL = ""; // placeholder
export const ADDRESS = ""; // placeholder

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
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
