"use client";

import { Chip } from "@/components/ui/Chip";
import { chipCategories, SelectedChips } from "@/lib/chips";

interface ChipSelectorProps {
  selectedChips: SelectedChips;
  onChipToggle: (categoryId: string, chipId: string) => void;
}

export function ChipSelector({ selectedChips, onChipToggle }: ChipSelectorProps) {
  return (
    <div className="space-y-4">
      {chipCategories.map((category) => (
        <div key={category.id}>
          <label className="block text-sm font-medium text-white/60 mb-2">
            {category.label}
            {category.multiSelect && (
              <span className="text-white/40 ml-1">(select multiple)</span>
            )}
          </label>
          <div className="flex flex-wrap gap-2">
            {category.chips.map((chip) => (
              <Chip
                key={chip.id}
                label={chip.label}
                emoji={chip.emoji}
                selected={selectedChips[category.id]?.includes(chip.id)}
                onClick={() => onChipToggle(category.id, chip.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
