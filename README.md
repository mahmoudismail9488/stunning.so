# Stunning - Idea to Prompt Generator

A beautiful landing page hero section that transforms rough website ideas into clear, actionable prompts using AI.

## Features

- **AI-Powered Prompt Enhancement**: Uses Google Gemini to transform vague ideas into detailed, actionable website prompts
- **Smart Chip Selection**: Pre-defined options for website type, style, features, and industry
- **Modern UI**: Glassmorphism design with gradient accents and smooth animations
- **Copy to Clipboard**: One-click copy for the generated prompt
- **Optional Persistence**: Store transformations in Supabase for analytics

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS 4 with custom theme
- **AI**: Google Gemini 2.0 Flash via Vercel AI SDK
- **Database**: Supabase (PostgreSQL) - optional

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd stunning.so
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# Required
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Optional (for data persistence)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Database Setup (Optional)

If you want to persist transformations, set up Supabase:

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Copy your project URL and anon key to `.env.local`

### 2. Create the Table

Run this SQL in the Supabase SQL Editor:

```sql
CREATE TABLE idea_transformations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_idea TEXT NOT NULL,
  selected_chips JSONB DEFAULT '{}',
  improved_prompt TEXT NOT NULL,
  model_used TEXT DEFAULT 'gemini-2.0-flash',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT
);

-- Optional: Add an index for session lookups
CREATE INDEX idx_session_id ON idea_transformations(session_id);
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── improve/
│   │       └── route.ts      # AI endpoint
│   ├── globals.css           # Theme & animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── hero/
│   │   ├── Hero.tsx          # Main hero section
│   │   ├── ChipSelector.tsx  # Chip selection UI
│   │   └── ResultCard.tsx    # Result display
│   └── ui/
│       ├── GlassCard.tsx     # Glass container
│       ├── GlassButton.tsx   # Glass button
│       ├── GlassTextarea.tsx # Glass input
│       ├── Chip.tsx          # Selectable chip
│       └── CopyButton.tsx    # Copy functionality
└── lib/
    ├── chips.ts              # Chip definitions
    └── supabase.ts           # Supabase client
```

## How It Works

1. User enters their rough website idea in the textarea
2. User optionally selects chips for:
   - Website Type (Landing Page, E-commerce, etc.)
   - Style & Vibe (Minimalist, Bold, Dark Mode, etc.)
   - Key Features (Mobile-first, Animations, Auth, etc.)
   - Industry (Tech, Food, Health, etc.)
3. AI analyzes the input and generates a comprehensive, actionable prompt
4. User can copy the result and use it with any website builder or AI tool

## Customization

### Adding New Chips

Edit `src/lib/chips.ts` to add new chip categories or options.

### Changing the AI Prompt

Edit the `systemPrompt` in `src/app/api/improve/route.ts` to customize how prompts are enhanced.

### Styling

The theme is defined in `src/app/globals.css`. Key classes:

- `.glass` - Basic glassmorphism
- `.glass-strong` - Stronger glass effect
- `.gradient-text` - Gradient text effect
- `.glow-violet` - Purple glow shadow
- `.animated-gradient` - Animated background
