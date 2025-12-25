"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className = "", glow = false }: GlassCardProps) {
  return (
    <div
      className={`
        glass-strong
        rounded-2xl
        p-6
        ${glow ? "glow-violet" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
