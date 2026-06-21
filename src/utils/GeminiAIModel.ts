import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_PUBLIC_GOOGLE_GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey});

export const chatSession = ai.chats.create({
  model: "gemini-3-flash-preview",
  config: {
    responseMimeType: "application/json",
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  },
});