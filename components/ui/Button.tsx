import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClasses =
  "rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "hover:scale-[1.03]",
  secondary: "hover:scale-[1.02]",
};

/**
 * Every button on the site shares this base — same hover duration,
 * easing, and focus ring — while each usage supplies its own
 * section-specific colors via `className`.
 */
export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
