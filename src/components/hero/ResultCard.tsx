"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { GlassButton } from "@/components/ui/GlassButton";

interface ResultCardProps {
  result: string;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  return (
    <GlassCard className="mt-6 animate-fade-in" glow>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold gradient-text">
          Your Enhanced Prompt
        </h3>
        <CopyButton text={result} />
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
          {result}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <GlassButton variant="secondary" onClick={onReset}>
          Start Over
        </GlassButton>
      </div>
    </GlassCard>
  );
}
