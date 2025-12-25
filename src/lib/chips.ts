export interface ChipOption {
  id: string;
  label: string;
  emoji: string;
}

export interface ChipCategory {
  id: string;
  label: string;
  chips: ChipOption[];
  multiSelect?: boolean;
}

export const chipCategories: ChipCategory[] = [
  {
    id: "type",
    label: "Website Type",
    multiSelect: false,
    chips: [
      { id: "landing", label: "Landing Page", emoji: "🚀" },
      { id: "ecommerce", label: "E-commerce", emoji: "🛒" },
      { id: "portfolio", label: "Portfolio", emoji: "💼" },
      { id: "saas", label: "SaaS", emoji: "☁️" },
      { id: "blog", label: "Blog", emoji: "📝" },
      { id: "agency", label: "Agency", emoji: "🏢" },
    ],
  },
  {
    id: "style",
    label: "Style & Vibe",
    multiSelect: true,
    chips: [
      { id: "minimalist", label: "Minimalist", emoji: "✨" },
      { id: "bold", label: "Bold & Creative", emoji: "🎨" },
      { id: "dark", label: "Dark Mode", emoji: "🌙" },
      { id: "colorful", label: "Colorful", emoji: "🌈" },
      { id: "corporate", label: "Corporate", emoji: "🏛️" },
      { id: "playful", label: "Playful", emoji: "🎮" },
    ],
  },
  {
    id: "features",
    label: "Key Features",
    multiSelect: true,
    chips: [
      { id: "mobile_first", label: "Mobile-first", emoji: "📱" },
      { id: "animations", label: "Animations", emoji: "⚡" },
      { id: "auth", label: "Auth/Login", emoji: "🔐" },
      { id: "payments", label: "Payments", emoji: "💳" },
      { id: "dashboard", label: "Dashboard", emoji: "📊" },
      { id: "i18n", label: "Multi-language", emoji: "🌍" },
    ],
  },
  {
    id: "industry",
    label: "Industry",
    multiSelect: false,
    chips: [
      { id: "tech", label: "Tech", emoji: "💻" },
      { id: "food", label: "Food & Restaurant", emoji: "🍕" },
      { id: "health", label: "Health", emoji: "🏥" },
      { id: "education", label: "Education", emoji: "🎓" },
      { id: "fitness", label: "Fitness", emoji: "🏋️" },
      { id: "travel", label: "Travel", emoji: "✈️" },
    ],
  },
];

export type SelectedChips = {
  [categoryId: string]: string[];
};
