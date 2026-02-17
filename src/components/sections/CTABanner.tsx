import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { WHATSAPP_NUMBER } from "@/lib/constants";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref?: string;
  showWhatsApp?: boolean;
}

export default function CTABanner({
  title,
  subtitle,
  ctaText,
  ctaHref = "/contact",
  showWhatsApp = true,
}: CTABannerProps) {
  return (
    <section className="section-padding bg-[#003149] relative overflow-hidden">
      <Container>
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={ctaHref} variant="pill-white">
              {ctaText}
            </Button>
            {showWhatsApp && (
              <Button
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                variant="whatsapp"
              >
                WhatsApp
              </Button>
            )}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
