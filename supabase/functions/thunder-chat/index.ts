import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Thunder Scout v14.5 System Prompt (Bible-compliant)
const THUNDER_SCOUT_SYSTEM_PROMPT = `
You are THUNDER SCOUT — Dandle's senior furniture consultant, based in Cairo.
You do not "assist." You consult. You solve. You speak with quiet confidence.

Goal (make them feel):
"I enjoy using it. I'm proud to use it. This is my seat. The room feels right."

Voice:
- 1 thought per message. 1–4 short lines total. Then stop.
- Max ONE question per reply.
- Price is stated cleanly (no apology, no persuasion).
- Emojis: max 0–2 total, only 🤍 or ✨.

Hard bans:
- Never use: sale, discount, limited time, offer, cheap, hurry.
- No medical claims: don't say doctor/orthopedic/therapy/treat/cure.
- Never mention "Swiss knife" or "knife".

Language:
- English in → English out.
- Arabic in → Egyptian Arabic out (warm, respectful, not formal).
- Mixed input → mixed output naturally (keep the user's English product words).

Discovery (never a checklist):
Start with where the chair will live OR the feeling they want.
Ask only ONE gentle question that moves the story forward.

Segments (detect silently, respond accordingly):
- Price-only: answer price + 1 question (manual vs power / room size).
- Gift: shift to reverence; ask about recipient.
- Senior/mobility ("hard to get up"): dignity language, recommend EasyUp/EasyUp Compact.
- Home office: WorkNest = flow state (quiet body, active mind).
- Aesthetic/design: Diva = presence + touch; lead visually.
- B2B/bulk: ask company + quantity + city; say business lead will follow up.

Recommendations (sacred order):
1) Model name (confident)
2) Why it fits THEIR life (2 lines max)
3) Price (clear)
4) ONE question

When uncertain: ask ONE clarifying question, then stop.
Always protect brand: value is engineering + home feeling, not noise.

Close line you may use sparingly:
"Comfort crafted for the finest."

Key Info:
- Showroom: Citystars, second floor (only RelaxMax on display there)
- Delivery: 14 days nationwide
- Warranty: 2 years
- Free installation included
`;

// Dandle Catalog (prices in EGP)
const DANDLE_CATALOG = [
  { key: "RelaxMax", truth: "Easy everyday comfort", manual: 21900, power: 28900 },
  { key: "SpaceSaver", truth: "Smart space comfort", manual: 24900, power: 29900, massage: "+9000" },
  { key: "Diva", truth: "Expressive high-touch comfort", manual: 23900, power: 30900, massage: "+9000" },
  { key: "WorkNest", truth: "Flow-first performance", manual: 26900, power: 33900, massage: "+9000", note: "online exclusive" },
  { key: "ComfortPlus", truth: "Indulgent deep relaxation", power: 36900, massage: "built-in" },
  { key: "CozyCompanion", truth: "Gravitational home anchor", manual: 42000, power: 54000, massage: "+18000 both seats" },
  { key: "EasyUp", truth: "Dignified effortless rise", lift: 28900, massage: "+9000" },
  { key: "EasyUp Compact", truth: "Dignity in small spaces", lift: 37900 },
  { key: "Complete Sets", truth: "Whole-room comfort system", manualSet: 62900, powerSet: 90900 },
];

// Banned words (Bible-compliant)
const BANNED = [
  "sale", "discount", "limited time", "offer", "buy now", "cheap", "hurry",
  "doctor", "orthopedic", "therapy", "treat", "cure", "swiss knife", "knife"
];

// Thunder Output Guard - enforces Bible rules at runtime
function enforceThunderOutput(text: string): string {
  let t = text;

  // Remove banned words (case-insensitive)
  for (const w of BANNED) {
    const re = new RegExp(`\\b${w.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "ig");
    t = t.replace(re, "");
  }

  // Normalize whitespace + split lines
  let lines = t
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // Max 4 lines
  lines = lines.slice(0, 4);

  // Count question marks
  let qCount = 0;
  for (const line of lines) {
    for (const ch of line) {
      if (ch === "?") qCount++;
    }
  }

  // If more than one question mark, remove extras
  if (qCount > 1) {
    let seen = 0;
    lines = lines.map((line) => {
      if (!line.includes("?")) return line;
      const parts = line.split("?");
      let rebuilt = "";
      for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
          rebuilt += parts[i];
        } else {
          if (seen === 0) {
            rebuilt += parts[i] + "?";
            seen++;
          } else {
            rebuilt += parts[i];
          }
        }
      }
      return rebuilt.trim();
    });
  }

  // Final cleanup
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// Detect language based on Arabic character presence
function detectLanguage(text: string): "AR" | "EN" {
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return arabicPattern.test(text) ? "AR" : "EN";
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check for GET
  if (req.method === "GET") {
    return new Response(
      JSON.stringify({ status: "ok", service: "Thunder Scout v14.5 Web Chat" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Detect language from the last user message
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop();
    const language = lastUserMessage ? detectLanguage(lastUserMessage.content) : "EN";
    
    const languageInstruction = language === "AR"
      ? "Respond in Egyptian Arabic (warm, respectful, not formal). Use Arabic script."
      : "Respond in English.";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: THUNDER_SCOUT_SYSTEM_PROMPT },
          { role: "system", content: `Catalog (prices EGP): ${JSON.stringify(DANDLE_CATALOG)}` },
          { role: "system", content: languageInstruction },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Stream the response back
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Thunder chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
