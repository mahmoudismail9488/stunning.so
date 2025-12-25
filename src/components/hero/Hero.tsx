"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassTextarea } from "@/components/ui/GlassTextarea";
import { ChipSelector } from "./ChipSelector";
import { ResultCard } from "./ResultCard";
import { SelectedChips, chipCategories } from "@/lib/chips";

export function Hero() {
  const [idea, setIdea] = useState("");
  const [selectedChips, setSelectedChips] = useState<SelectedChips>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChipToggle = (categoryId: string, chipId: string) => {
    setSelectedChips((prev) => {
      const category = chipCategories.find((c) => c.id === categoryId);
      const currentSelection = prev[categoryId] || [];

      if (category?.multiSelect) {
        // Toggle for multi-select
        if (currentSelection.includes(chipId)) {
          return {
            ...prev,
            [categoryId]: currentSelection.filter((id) => id !== chipId),
          };
        } else {
          return {
            ...prev,
            [categoryId]: [...currentSelection, chipId],
          };
        }
      } else {
        // Single select - replace or toggle off
        if (currentSelection.includes(chipId)) {
          return {
            ...prev,
            [categoryId]: [],
          };
        } else {
          return {
            ...prev,
            [categoryId]: [chipId],
          };
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError("Please enter your website idea first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea: idea.trim(),
          selectedChips,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate prompt");
      }

      const data = await response.json();
      setResult(data.improvedPrompt);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIdea("");
    setSelectedChips({});
    setResult(null);
    setError(null);
  };

  const hasSelection = Object.values(selectedChips).some(
    (chips) => chips.length > 0
  );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Turn your idea into a{" "}
            <span className="gradient-text">perfect prompt</span>
          </h1>
          <p className="text-lg text-white/60 max-w-lg mx-auto">
            Describe your website vision, select your preferences, and let AI
            craft a detailed prompt you can use to build it.
          </p>
        </div>

        {/* Main Card */}
        {!result ? (
          <GlassCard glow>
            {/* Idea Input */}
            <GlassTextarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="I want a website for my coffee shop that shows our menu, allows online ordering, and has a loyalty program..."
              rows={4}
            />

            {/* Chip Selector */}
            <div className="mt-6">
              <ChipSelector
                selectedChips={selectedChips}
                onChipToggle={handleChipToggle}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6">
              <GlassButton
                onClick={handleSubmit}
                loading={loading}
                disabled={!idea.trim()}
                size="lg"
                className="w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                    />
                  </svg>
                  Generate Perfect Prompt
                </span>
              </GlassButton>
            </div>

            {/* Helper text */}
            {!hasSelection && (
              <p className="mt-4 text-center text-sm text-white/40">
                Tip: Select some chips above to get a more tailored prompt
              </p>
            )}
          </GlassCard>
        ) : (
          <ResultCard result={result} onReset={handleReset} />
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-white/30">
          Powered by AI to help you build better websites faster
        </p>
      </div>
    </section>
  );
}
