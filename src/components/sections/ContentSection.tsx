import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}

export default function ContentSection({
  children,
  className = "",
  dark = false,
  id,
}: ContentSectionProps) {
  return (
    <section
      id={id}
      className={`section-padding ${dark ? "bg-[#003149] text-white" : "bg-cream"} ${className}`}
    >
      <Container>
        <AnimatedSection>{children}</AnimatedSection>
      </Container>
    </section>
  );
}
