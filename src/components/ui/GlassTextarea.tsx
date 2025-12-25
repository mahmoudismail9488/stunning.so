"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface GlassTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/70 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full
            glass
            rounded-xl
            px-4
            py-3
            text-white
            placeholder-white/40
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-violet-500/50
            focus:border-violet-500/50
            transition-all
            duration-200
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

GlassTextarea.displayName = "GlassTextarea";
