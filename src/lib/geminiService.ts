import { ChatMessage } from '../types/database.types';
import { getAuraResponse as getFallbackResponse } from './aiCompanion';

// Read from Vite environment (loaded from .env locally or GitHub Secrets during deployment)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-flash-latest';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export const isAuraAIEnabled = Boolean(GEMINI_API_KEY);

const AURA_SYSTEM_INSTRUCTION = `
You are Aura, the AI wellness companion inside the AuraFit app.
Voice & style:
- Warm, calm, encouraging — never clinical, never a drill sergeant.
- Short, concrete replies: 2-4 sentences, occasionally with a tiny actionable step.
- You cover: movement, mobility, breathing, sleep, gentle nutrition, recovery, focus, and mindset.
- You are NOT a doctor. For anything medical, mention checking with a real care provider,
  briefly and without being preachy about it.
- Avoid emojis except very rarely. No hashtags. No corporate jargon.
- Assume the person is already trying their best; meet them where they are.
`.trim();

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

function toGeminiHistory(messages: ChatMessage[]): GeminiContent[] {
  return messages.map((m) => ({
    role: m.sender === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }));
}

/**
 * Gets a real AI response from Gemini, given the running chat history plus
 * the newest user message.
 * Falls back to the local canned responder if no key is set or the call fails.
 */
export async function getAuraAIResponse(history: ChatMessage[]): Promise<string> {
  const latestUserMessage = [...history].reverse().find((m) => m.sender === 'user');

  if (!isAuraAIEnabled) {
    return getFallbackResponse(latestUserMessage?.text ?? '');
  }

  try {
    const response = await fetch(`${ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: AURA_SYSTEM_INSTRUCTION }] },
        contents: toGeminiHistory(history),
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 220,
        },
      }),
    });

    if (!response.ok) {
      console.warn('Gemini API error:', response.status, await response.text());
      return getFallbackResponse(latestUserMessage?.text ?? '');
    }

    const data = await response.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return getFallbackResponse(latestUserMessage?.text ?? '');
    }

    return text.trim();
  } catch (err) {
    console.warn('Gemini request failed:', err);
    return getFallbackResponse(latestUserMessage?.text ?? '');
  }
}
