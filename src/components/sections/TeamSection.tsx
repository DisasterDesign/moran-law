"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

const teamMembers = [
  {
    key: "member1",
    image: "/images/moran-portrait-full.jpg",
    linkedin: "https://www.linkedin.com/in/placeholder1",
  },
  {
    key: "member2",
    image: "/images/moran-bw-new.jpg",
    linkedin: "https://www.linkedin.com/in/placeholder2",
  },
];

export default function TeamSection() {
  const t = useTranslations("team");

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-8">
        <AnimatedSection>
          <h2 className="section-heading text-text">{t("title")}</h2>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {teamMembers.map((member, index) => (
          <AnimatedSection key={member.key} delay={index * 0.1}>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block h-[60vh] overflow-hidden group"
            >
              <Image
                src={member.image}
                alt={t(`${member.key}.name`)}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-8 right-8 left-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-1">
                  {t(`${member.key}.name`)}
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  {t(`${member.key}.role`)}
                </p>
              </div>
              {/* LinkedIn indicator */}
              <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
