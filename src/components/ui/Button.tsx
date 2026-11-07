import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp" | "gold" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-tight rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs min-h-[36px]",
    md: "px-5 py-2.5 text-sm min-h-[44px]", // minimum 44px tap target
    lg: "px-6 py-3.5 text-base min-h-[50px]",
  };

  const variantStyles = {
    primary: "bg-[#008751] hover:bg-[#00563A] text-white focus:ring-[#008751] shadow-sm hover:shadow",
    secondary: "bg-[#151314] hover:bg-[#252223] text-white focus:ring-[#151314] shadow-sm",
    outline: "border border-stone-300 hover:border-stone-900 bg-transparent text-stone-900 hover:bg-stone-50",
    ghost: "text-stone-700 hover:bg-stone-100 hover:text-stone-900",
    whatsapp: "bg-[#25D366] hover:bg-[#20ba59] text-white focus:ring-[#25D366] shadow-sm",
    gold: "bg-[#FFC800] hover:bg-[#E5B400] text-[#151314] font-black focus:ring-[#FFC800] shadow-sm",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 focus:ring-red-500",
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

