interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""} ${className}`}>
      <h2
        className={`section-heading mb-3 ${
          light ? "text-white" : "text-text"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl leading-relaxed ${
            light ? "text-white/70" : "text-text-secondary"
          } ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
