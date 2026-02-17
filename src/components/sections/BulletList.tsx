"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

interface BulletListProps {
  title?: string;
  subtitle?: string;
  items: string[];
  columns?: 1 | 2 | 3 | 4;
  variant?: "checkmarks" | "cards";
  dark?: boolean;
  themeColor?: string;
}

export default function BulletList({
  title,
  subtitle,
  items,
  columns = 2,
  variant = "checkmarks",
  dark = false,
  themeColor = "#00A1C0",
}: BulletListProps) {
  const colsClass =
    columns === 4
      ? "md:grid-cols-4"
      : columns === 3
        ? "md:grid-cols-3"
        : columns === 2
          ? "md:grid-cols-2"
          : "grid-cols-1";

  return (
    <section className={`section-padding ${dark ? "bg-[#003149]" : "bg-white"}`}>
      {title && (
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="mb-8">
              <h2 className={`section-heading mb-3 ${dark ? "text-white" : "text-text"}`}>
                {title}
              </h2>
              {subtitle && (
                <p className={`text-lg max-w-2xl leading-relaxed ${dark ? "text-white/70" : "text-text-secondary"}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      )}

      {variant === "cards" ? (
        /* Tile Grid cards — full width, flat colored tiles with hover */
        <div className={`grid grid-cols-2 ${colsClass} gap-[1px]`}>
          {items.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <TileCard item={item} themeColor={themeColor} />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        /* Checkmarks variant — square bullets */
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className={`grid grid-cols-1 ${colsClass} gap-x-10 gap-y-3`}>
            {items.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="flex items-start gap-3 py-2">
                  <span
                    className="shrink-0 mt-2 w-2.5 h-2.5"
                    style={{ backgroundColor: dark ? "white" : themeColor }}
                  />
                  <span className={`${dark ? "text-white/90" : "text-text"} leading-relaxed`}>
                    {item}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TileCard({ item, themeColor }: { item: string; themeColor: string }) {
  return (
    <div
      className="group bg-tile-neutral p-5 md:p-6 cursor-default flex items-center justify-center text-center min-h-[80px] tile-hover-effect"
      style={{ '--tile-color': themeColor } as React.CSSProperties}
    >
      <p className="font-bold leading-snug text-text group-hover:text-white">{item}</p>
    </div>
  );
}
