"use client";

interface ChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, emoji, selected = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex
        items-center
        gap-1.5
        px-3
        py-1.5
        rounded-full
        text-sm
        font-medium
        transition-all
        duration-200
        cursor-pointer
        border
        ${
          selected
            ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
        }
      `}
    >
      {emoji && <span>{emoji}</span>}
      <span>{label}</span>
    </button>
  );
}
