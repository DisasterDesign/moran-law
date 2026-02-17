"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { WHATSAPP_NUMBER, WHATSAPP_SUBJECT_KEYS } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppFormProps {
  defaultSubject?: string;
  title?: string;
  subtitle?: string;
}

export default function WhatsAppForm({
  defaultSubject,
  title,
  subtitle,
}: WhatsAppFormProps) {
  const t = useTranslations("whatsappForm");
  const tMsg = useTranslations("whatsappMessage");

  const displayTitle = title || t("defaultTitle");
  const displaySubtitle = subtitle || t("defaultSubtitle");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: defaultSubject || "",
    description: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subjectLabel =
      WHATSAPP_SUBJECT_KEYS.find((key) => key === formData.subject)
        ? t(`subjects.${formData.subject}`)
        : formData.subject;

    const labels = {
      greeting: tMsg("greeting"),
      name: tMsg("name"),
      phone: tMsg("phone"),
      subject: tMsg("subject"),
      details: tMsg("details"),
    };

    const url = buildWhatsAppUrl(
      WHATSAPP_NUMBER,
      { ...formData, subject: subjectLabel },
      labels
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-white/30 px-0 py-3 text-white placeholder:text-white/40 focus:border-white focus:ring-0 outline-none transition-colors";

  return (
    <section id="whatsapp-form" className="section-padding bg-[#003149] relative">
      <div className="mx-auto max-w-2xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="section-heading text-white mb-3">{displayTitle}</h2>
            <p className="text-lg text-white/60">{displaySubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Phone in two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="wa-name" className="block text-xs font-light text-white/50 mb-1 tracking-wide">
                  {t("nameLabel")}
                </label>
                <input
                  id="wa-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={inputClass}
                  placeholder={t("namePlaceholder")}
                />
              </div>
              <div>
                <label htmlFor="wa-phone" className="block text-xs font-light text-white/50 mb-1 tracking-wide">
                  {t("phoneLabel")}
                </label>
                <input
                  id="wa-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={inputClass}
                  placeholder={t("phonePlaceholder")}
                  dir="ltr"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="wa-subject" className="block text-xs font-light text-white/50 mb-1 tracking-wide">
                {t("subjectLabel")}
              </label>
              <select
                id="wa-subject"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled className="text-gray-900">
                  {t("subjectPlaceholder")}
                </option>
                {WHATSAPP_SUBJECT_KEYS.map((key) => (
                  <option
                    key={key}
                    value={key}
                    className="text-gray-900"
                  >
                    {t(`subjects.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="wa-description" className="block text-xs font-light text-white/50 mb-1 tracking-wide">
                {t("descriptionLabel")}
              </label>
              <textarea
                id="wa-description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={`${inputClass} resize-none`}
                placeholder={t("descriptionPlaceholder")}
              />
            </div>

            {/* Submit */}
            <Button type="submit" variant="whatsapp" className="w-full text-lg">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("submit")}
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
