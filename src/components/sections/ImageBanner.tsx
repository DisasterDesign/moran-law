import AnimatedSection from "@/components/ui/AnimatedSection";

interface ImageBannerProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
}

export default function ImageBanner({ src, alt, className, objectPosition }: ImageBannerProps) {
  return (
    <AnimatedSection>
      <div className={`relative w-full h-[40vh] md:h-[50vh] overflow-hidden ${className ?? ""}`}>
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>
    </AnimatedSection>
  );
}
