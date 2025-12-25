import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { chipCategories } from "@/lib/chips";

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

// Initialize Supabase client (server-side with service key if available)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Helper to format selected chips into readable text
function formatChipsForPrompt(
  selectedChips: Record<string, string[]>
): string {
  const parts: string[] = [];

  for (const [categoryId, chipIds] of Object.entries(selectedChips)) {
    if (chipIds.length === 0) continue;

    const category = chipCategories.find((c) => c.id === categoryId);
    if (!category) continue;

    const labels = chipIds
      .map((id) => category.chips.find((c) => c.id === id)?.label)
      .filter(Boolean);

    if (labels.length > 0) {
      parts.push(`${category.label}: ${labels.join(", ")}`);
    }
  }

  return parts.length > 0 ? parts.join("\n") : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idea, selectedChips, sessionId } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a website idea" },
        { status: 400 }
      );
    }

    // Format the selected chips for the prompt
    const chipsContext = formatChipsForPrompt(selectedChips || {});

    // Build the system prompt
    const systemPrompt = `You are an expert website consultant and prompt engineer. Your job is to take a user's rough website idea and transform it into a detailed, actionable prompt that can be used to build the website.

Your improved prompt should:
1. Be clear and specific about the website's purpose
2. Define the target audience
3. Outline key pages and sections needed
4. Specify design direction and visual style
5. List essential features and functionality
6. Suggest content strategy and copy tone
7. Include technical considerations if relevant

Keep the prompt concise but comprehensive. Write in a way that a developer or AI website builder could immediately start working from it.

Format the output as a clear, well-structured prompt paragraph (not bullet points). Make it feel professional and actionable.`;

    // Build the user message
    let userMessage = `Transform this website idea into a perfect, detailed prompt:\n\n"${idea.trim()}"`;

    if (chipsContext) {
      userMessage += `\n\nUser preferences:\n${chipsContext}`;
    }

    // Call Gemini using native SDK
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\n${userMessage}` }],
        },
      ],
    });

    const text = result.response.text();

    // Store in Supabase if configured
    let recordId: string | null = null;
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("idea_transformations")
          .insert({
            original_idea: idea.trim(),
            selected_chips: selectedChips || {},
            improved_prompt: text,
            model_used: "gemini-2.5-flash",
            session_id: sessionId || null,
          })
          .select("id")
          .single();

        if (!error && data) {
          recordId = data.id;
        }
      } catch (dbError) {
        // Log but don't fail the request if DB fails
        console.error("Failed to store in database:", dbError);
      }
    }

    return NextResponse.json({
      improvedPrompt: text,
      id: recordId,
    });
  } catch (error) {
    console.error("Error improving idea:", error);
    return NextResponse.json(
      { error: "Failed to generate improved prompt. Please try again." },
      { status: 500 }
    );
  }
}
