import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface IdeaTransformation {
  id: string;
  original_idea: string;
  selected_chips: Record<string, string[]>;
  improved_prompt: string;
  model_used: string;
  created_at: string;
  session_id?: string;
}
