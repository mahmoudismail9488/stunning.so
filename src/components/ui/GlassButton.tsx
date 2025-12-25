"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function GlassButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}: GlassButtonProps) {
  const baseStyles = `
    relative
    font-medium
    rounded-xl
    transition-all
    duration-300
    cursor-pointer
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500
      text-white
      hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
      hover:scale-[1.02]
      active:scale-[0.98]
    `,
    secondary: `
      glass
      text-white/90
      hover:bg-white/10
      hover:border-white/20
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Generating...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
