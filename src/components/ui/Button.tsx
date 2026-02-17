import { Link } from "@/i18n/navigation";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "outline" | "pill-white" | "pill-dark" | "pill-outline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#003149] text-white hover:bg-[#00405E] rounded-full",
  secondary:
    "bg-blue-electric text-white hover:opacity-90 rounded-full",
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-dark rounded-full",
  outline:
    "border-2 border-text text-text hover:bg-text hover:text-white rounded-full",
  "pill-white":
    "bg-white text-[#003149] hover:bg-white/90 rounded-full",
  "pill-dark":
    "bg-[#003149] text-white hover:bg-[#00405E] rounded-full",
  "pill-outline":
    "border border-white/50 text-white hover:bg-white/10 rounded-full",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-7 py-3 font-bold text-base transition-all duration-300 focus:outline-none cursor-pointer";
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
